const Order = require('../Model/Order');
const jwt = require('jsonwebtoken');
const pool = require('../db');

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
  
  //tested
  //NEED TO BE PUSHED
  //get all orders assigned to a specific courier based on their ID
  const getAssignedOrders = async (req, res) => {
  
    try {
      const orders = await Order.assignedOrders(req, res);
      if (orders.length === 0)
        {
       return res.status(404).json({ message: 'No orders found' });
     }
      res.status(200).json(orders);
    } catch (err) {
      console.error('Error fetching assigned orders:', err);
      res.status(500).json({ error: 'Failed to fetch assigned orders' });
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
      const isCourier = await Order.isCourier(userId);
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

      const updateOrderQuery = 'UPDATE "Orders" SET "status" = $1, "courier_id" = $2 WHERE "order_id" = $3 RETURNING *';
      const updateOrderResult = await pool.query(updateOrderQuery, [status, userId, orderId]);

  
      res.status(200).json({ message: 'Order status updated successfully', updatedAssignment: updateResult.rows[0] });
    } catch (err) {
      console.error('Error updating order status:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getOrdersWithAssignments = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT o.*, a.courier_id, a.status AS assignment_status
            FROM "Orders" o
            RIGHT JOIN "Assignments" a ON o.order_id = a.order_id
        `);
  
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching orders with assignments:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
  };
  
  //For admin
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.getAllOrders();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all orders' });
    }
  };
  
  const updateOrderStatusByAdmin = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    try {
      const updatedOrder = await Order.updateOrderStatusByAdmin(orderId, status);
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json({ error: 'Error updating order status' });
    }
  };
  
  //by admin
  const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const deletedOrder = await Order.deleteOrderByAdmin(orderId);
      if (deletedOrder) {
        res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error deleting order' });
    }
  };
  //tested
//by courier
  const acceptOrder = async (req, res) => {
  
    try {
      const acceptedOrder = await Order.updateAcceptanceStatus(req, res);
      res.status(200).json({ message: 'Order accepted successfully', acceptedOrder });
    } catch (err) {
      res.status(500).json({ error: 'Error in accepting order', err });
    }
  };

  //tested
  const getPendingOrders = async (req, res) => {
      try {
        const newOrders = await Order.displayAllPendingOrders();
        res.status(200).json({ newOrders });
      } catch (err) {
        console.error('Error fetching new orders:', err);
        res.status(500).json({ error: 'Failed to fetch new orders' });
      }
    
  };

module.exports = {
    createOrder,
    getOrderById,
    getAssignedOrders,
    cancelOrder,
    updateOrderStatus,
    getOrdersWithAssignments,
    getAllOrders,
    updateOrderStatusByAdmin,
    deleteOrder,
    acceptOrder,
    getPendingOrders
}
