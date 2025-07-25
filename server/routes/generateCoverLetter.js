import express from 'express';
import OpenAI from 'openai';
import Application from '../models/application.js';
import User from '../models/user.js';


const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const useMock = process.env.USE_MOCK_AI === 'true';

router.post('/', async (req, res) => {
  const { jobDesc, resumeText, jobTitle, company, userId } = req.body;

  if (!jobDesc || !resumeText) {
    return res.status(400).json({ error: 'Missing job description or resume text.' });
  }

  // Validate user exists
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ error: `User with id ${userId} does not exist.` });
  }

  // MOCK MODE
  if (useMock) {
    const snippet = jobDesc.length > 100 ? jobDesc.slice(0, 100) + '...' : jobDesc;

    const fakeCoverLetter = `
Dear Hiring Manager,

I'm thrilled to apply for this opportunity. Based on the job description — "${snippet}" — I believe my skills align well with your needs. 

With over 5 years of experience in React development, I've built scalable and responsive web applications that prioritize performance, usability, and clean code. I’m confident that I can contribute meaningfully to your team from day one.

Thank you for considering my application. I’d love the chance to speak further about how I can help.

Sincerely,  
A Passionate Developer
    `;
  try {
    
    // ✅ Save to DB
    const application = await Application.create({
      jobTitle,
      company,
      jobDesc,
      resumeText,
      coverLetterText: fakeCoverLetter,
      status: 'draft',
      userId,
      appliedDate: null,
    });

    return res.json({ coverLetter: fakeCoverLetter, application });
    
    } catch (error) {
    console.error('Sequelize insert error:', error);
    return res.status(500).json({ error: 'Failed to generate cover letter.' });
  }

  }

  // REAL MODE
  try {
    const prompt = `
Write a professional cover letter for the following job:

Job Description:
${jobDesc}

Tailor it to the resume below:
${resumeText}

Keep it under 350 words. Make it sound confident, motivated, and human.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 450,
      temperature: 0.7,
    });

    const coverLetter = completion.choices[0].message.content;

    // ✅ Save to DB
    const application = await Application.create({
      jobTitle,
      company,
      jobDesc,
      resumeText,
      coverLetterText: coverLetter,
      status: 'draft',
      userId,
      appliedDate: null,
    });

    res.json({ coverLetter, application });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate cover letter.' });
  }
});

export default router;