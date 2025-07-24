import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { Application } = db;

// Create a new application
router.post('/', async (req, res) => {
  try {
    const app = await Application.create(req.body);
    res.status(201).json(app);
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Get all applications (optionally filter by userId)
router.get('/', async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.userId) {
      whereClause.userId = req.query.userId;
    }

    const apps = await Application.findAll({ where: whereClause });
    res.json(apps);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Update application
router.patch('/:id', async (req, res) => {
  try {
    const [updated] = await Application.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedApp = await Application.findByPk(req.params.id);
      return res.json(updatedApp);
    }
    throw new Error('Application not found');
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Application.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      return res.json({ message: 'Application deleted' });
    }
    throw new Error('Application not found');
  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

export default router;
