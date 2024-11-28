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
  //get all orders assigned to a specific courier based on their ID
  const getAssignedOrders = async (req, res) => {
  
    try {
      const courierId = req.user.id;
      const orders = await Order.assignedOrders(courierId);
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
    const courierId = req.user.id;

    try {
        // Check if user is a courier
        const isCourier = await Order.isCourier(courierId);
        if (!isCourier) {
            return res.status(403).json({ error: 'Only couriers are authorized to perform this action' });
        }

        // Check if the order is assigned to this courier
        const assignment = await Order.checkAssignment(orderId, courierId);
        if (!assignment) {
            return res.status(403).json({ error: 'This order is not assigned to you' });
        }

        // Update assignment status
        const updatedAssignment = await Order.updateAssignmentStatus(assignment.assignment_id, status);

        // Update order status
        const updatedOrder = await Order.updateOrderStatus(orderId, courierId, status);

        // Respond with success
        res.status(200).json({
            message: 'Order status updated successfully',
            updatedOrder
        });
    } catch (err) {
        console.error('Error updating order status:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


  const getAllCouriers = async (req, res) => {
    try {
      const couriers = await Order.displayCouriers();
      res.status(200).json(couriers);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all orders' });
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

  const getOrdersWithAssignments = async (req, res) => {
    try {
        const orders = await Order.getOrdersWithAssignments();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Controller to reassign an order
const reassignOrder = async (req, res) => {
    const { orderId, courierId } = req.params;

    try {
        const assignment = await Order.reassignOrder(orderId, courierId);

        if (!assignment) {
            return res.status(404).json({ error: 'Order not found or not assigned' });
        }

        res.status(200).json({
            message: 'Order reassigned successfully',
            assignment,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reassign order' });
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
    getPendingOrders,
    getAllCouriers,
    reassignOrder
}
