const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Adjust path if needed

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Incoming POST body:', req.body); // <-- Add this to debug
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


module.exports = router;
