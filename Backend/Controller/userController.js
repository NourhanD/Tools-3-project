const User = require('../Model/user');
const Order = require('../Model/Order');
const jwt = require('jsonwebtoken');
const pool = require('../db');
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
    console.log(user);

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
const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id; 
  try
  {
    const order = await Order.getOrderById(userId, orderId); 
    res.status(200).json(order); 
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(404).json({ error: err.message }); 
  }
};
const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id; 

  try {
    const canceledOrder = await Order.cancelOrder(orderId, userId);
    res.status(200).json({ message: 'Order canceled successfully', order: canceledOrder });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const userId = req.user.id; 

  try {
    const isCourier = await   Order.isCourier(userId);
    if (!isCourier) {
      return res.status(403).json({ error: 'Only couriers are authorized to perform this action' });
    }
    const assignmentQuery = 'SELECT * FROM "Assignments" WHERE "order_id" = $1 AND "courier_id" = $2';
    const assignmentResult = await pool.query(assignmentQuery, [orderId, userId]);

    if (assignmentResult.rows.length === 0) {
      return res.status(403).json({ error: 'This order is not assigned to you' });
    }
    const updateQuery = 'UPDATE "Assignments" SET "status" = $1 WHERE "assignment_id" = $2 RETURNING *';
    const updateResult = await pool.query(updateQuery, [status, assignmentResult.rows[0].assignment_id]);

    res.status(200).json({ message: 'Order status updated successfully', updatedAssignment: updateResult.rows[0] });
  } catch (err) {
    console.error('Error updating order status:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  register,
  login,
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus
};
