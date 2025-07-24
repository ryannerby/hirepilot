const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');


app.use(cors());
app.use(express.json());
app.use('/users', userRoutes); // Mounts /users

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('HirePilot backend is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
