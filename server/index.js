import 'dotenv/config';          // loads .env automatically
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.js';
import applicationRouter from './routes/application.js';
import generateCoverLetterRouter from './routes/generateCoverLetter.js';

import db from './models/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/applications', applicationRouter);
app.use('/api/generate-cover-letter', generateCoverLetterRouter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/', (req, res) => {
  res.send('HirePilot backend is running');
});

const PORT = process.env.PORT || 5001;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected!');
    await db.sequelize.sync({ alter: true }); // or use force: true if you want to reset tables during dev

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ DB connection failed:', err);
    process.exit(1); // Exit if DB connection fails
  }
})();
