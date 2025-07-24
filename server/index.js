require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');
const applicationRouter = require('./routes/application');
const generateCoverLetterRouter = require('./routes/generateCoverLetter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware (logs every request)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/users', userRoutes);
app.use('/applications', applicationRouter);
app.use('/api/generate-cover-letter', generateCoverLetterRouter);

// Health check
app.get('/health', (req, res) => res.send('OK'));

// Root route
app.get('/', (req, res) => res.send('HirePilot backend is running'));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
