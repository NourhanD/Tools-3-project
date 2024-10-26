const User = require('./Model/user');
const express = require('express');
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 5000; 
app.use(express.json());
app.post('/register', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  try {
    const newUser = await User.register(firstName, lastName, phoneNumber, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (password !== user.password) {
      console.error('Invalid password');
      return res.status(400).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Logged in successful' });
  } 
  catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
  pool.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to PostgreSQL database');
    }
  });
}
module.exports = app;
