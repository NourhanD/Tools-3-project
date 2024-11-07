const User = require('../Model/user');
const Order = require('../Model/Order');
const jwt = require('jsonwebtoken');

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

// Create an order
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const { pickup_loc, dropoff_loc,  package_details, delivery_time } = req.body;

    if (!pickup_loc || !dropoff_loc || !package_details || !delivery_time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newOrder = await Order.createOrder(userId, {pickup_loc, dropoff_loc, package_details, delivery_time, status: 'Pending'});
    res.status(201).json(newOrder);
  } 
  catch (err) 
  {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

//Get order
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

module.exports = {
  register,
  login,
  createOrder,
  getUserOrders
};
