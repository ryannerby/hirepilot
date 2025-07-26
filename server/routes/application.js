import express from 'express';
import db from '../models/index.js';
import requireUser from '../middleware/requireUser.js';

const router = express.Router();
const { Application } = db;

// Create a new application
router.post('/', requireUser, async (req, res) => {
  try {
    const { jobTitle, company, jobDesc, resumeText, coverLetterText, status = 'draft', appliedDate = null } = req.body;

    const app = await Application.create({
      jobTitle,
      company,
      jobDesc,
      resumeText,
      coverLetterText,
      status,
      appliedDate,
      userId: req.userId,
    });

    res.status(201).json(app);
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).json({ error: 'Failed to create application' });
  }
});


// Get all applications
router.get('/', requireUser, async (req, res) => {
  try {
    const apps = await Application.findAll({
      where: { userId: req.userId },
    });
    res.json(apps);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});


// Update application
router.patch('/:id', requireUser, async (req, res) => {
  try {
    // Ensure the application belongs to the logged-in user
    const app = await Application.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!app) {
      return res.status(404).json({ error: 'Application not found or not authorized' });
    }

    // Only allow updating allowed fields
    const allowedFields = ['status', 'appliedDate', 'coverLetterText', 'jobTitle', 'company'];
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        app[key] = req.body[key];
      }
    }

    await app.save();
    res.json(app);
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({ error: 'Failed to update application' });
  }
});


// Delete application
router.delete('/:id', requireUser, async (req, res) => {
  try {
    const deleted = await Application.destroy({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (deleted) {
      return res.json({ message: 'Application deleted' });
    }
    throw new Error('Not found or not authorized');
  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});


export default router;
