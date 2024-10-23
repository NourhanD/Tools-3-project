const User = require('./Model/user');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000; 
app.use(express.json());
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.register(name, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
