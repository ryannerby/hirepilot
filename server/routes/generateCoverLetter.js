import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { jobDesc, resumeText } = req.body;

  if (!jobDesc || !resumeText) {
    return res.status(400).json({ error: 'Missing job description or resume text.' });
  }

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

    res.json({ coverLetter });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate cover letter.' });
  }
});

export default router;
