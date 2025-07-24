const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Adjust path if needed
console.log('User model:', User);

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
