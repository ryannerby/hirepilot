const express = require('express');
const router = express.Router();
const { Application } = require('../models');

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

// Get all applications (optionally filter by userId via query param)
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

// Update an application by id
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

// Delete an application by id
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

module.exports = router;
