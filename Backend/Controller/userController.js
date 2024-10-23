const User = require('./model/User');

const register = async (req, res) => {
  const { Name, Email, Password } = req.body;
  try {
    const newUser = await User.createUser(Name, Email, Password);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
module.exports = {
  register
};
