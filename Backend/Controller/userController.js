const User = require('../Model/user');
const Order = require('../Model/Order');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Create a user
const register = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, role } = req.body;

  try {
    const newUser = await User.register(firstName, lastName, phoneNumber, email, password, role);
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
    
    if (password !== user.password) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ id : user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Logged in successful', user, token });
  } 
  catch (err) 
  {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};


//get user orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; 
    const orders = await Order.getOrdersByUserId(userId);
    if (orders.length === 0)
       {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.status(200).json(orders);
  } 
  catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// get a certain order details

const isAdmin = async (req, res, next) => {
  try {
      const userId = req.user.id; // Assuming req.user is populated with the logged-in user's data
      const result = await pool.query('SELECT role FROM "User" WHERE "id" = $1', [userId]);

      if (result.rows.length > 0 && result.rows[0].role === 'admin') {
          next();
      } else {
          res.status(403).json({ error: 'Access denied. Admins only.' });
      }
  } catch (error) {
      console.error('Error checking admin role:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  register,
  login,
  getUserOrders,
  isAdmin
};
