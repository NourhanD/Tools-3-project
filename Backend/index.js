const User = require('./Model/user');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; 
app.use(express.json());
app.post('/users', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const newUser = await User.register(name, email, password, phone);
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
    res.status(200).json({ message: 'Login successful' });
    //res.status(200).json({ message: 'Login successful', user });
  } 
  catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
