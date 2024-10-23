const User = require('./model/User');

// Create a new user
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const newUser = await User.createUser(name, email, password, phone);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
// user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful', user, token });
  } 
  catch (err) 
  {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  register,
  login
};
