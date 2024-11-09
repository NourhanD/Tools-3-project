const pool = require('../db');

class Order {
  static async createOrder(userId,data) {
    const { pickup_loc, dropoff_loc, package_details, delivery_time, status } = data;
    const query = 'INSERT INTO "Orders" ("user_id", "pickup_loc","dropoff_loc", "package_details", "delivery_time", "status") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values =[userId, pickup_loc, dropoff_loc, package_details, delivery_time, status || 'Pending' ];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
      } catch (err) {
        console.error('Error creating order:', err);
        throw err; 
      }
    }

    static async getOrdersByUserId(userId) {
      const query = 'SELECT * FROM "Orders" WHERE "user_id" = $1';
      
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (err) {
        console.error('Error fetching user orders:', err);
        throw err;
      }
    }

    static async getOrderById(userId, orderId) {
      const query = 'SELECT * FROM "Orders" WHERE "user_id" = $1 AND "order_id" = $2';

      try {
        const result = await pool.query(query, [userId, orderId]);
        if (result.rows.length === 0) {
          throw new Error('Order not found or unauthorized access');
        }
        return result.rows[0];
      } catch (err) {
        console.error('Error fetching order details:', err);
        throw err;
      }
    }

    static async cancelOrder(orderId, userId) {
      const query = `
        UPDATE "Orders"
        SET "status" = 'Canceled'
        WHERE "order_id" = $1 AND "user_id" = $2 AND "status" = 'Pending'
        RETURNING *;

      `;
      try {
        const result = await pool.query(query, [orderId, userId]);
        if (result.rows.length === 0) {
          throw new Error('Order cannot be canceled (either not found, unauthorized, or already processed)');
        }
        return result.rows[0];
      } catch (err) {
        console.error('Error canceling order:', err);
        throw err;
      }
    }
    static async isCourier(userId) {
      try {
        const query = 'SELECT * FROM "Courier" WHERE "id" = $1';
        const result = await pool.query(query, [userId]);
  
        return result.rows.length > 0;
      } catch (err) {
        console.error('Error checking if user is a courier:', err);
        throw err;
      }
    }

    
    //tested
    static async assignedOrders(req, res) {
      const courier_id = req.user.id;
      const query = 'SELECT * FROM "Assignments" WHERE "courier_id" = $1';
      const values = [courier_id];
  
      try {
        const result = await pool.query(query, values);
        return result.rows;
      } catch (err) {
        console.error('Error fetching assigned orders:', err);
        throw err;
      }
    }

    //tested
    //get all orders for admin only
    static async getAllOrders() {
      const query = 'SELECT * FROM "Orders"';
      try {
        const result = await pool.query(query);
        return result.rows;
      } catch (err) {
        console.error('Error fetching all orders:', err);
        throw err;
      }
    }

    static async updateOrderStatusByAdmin(orderId, status) {
      const query = 'UPDATE "Orders" SET "status" = $1 WHERE "order_id" = $2 RETURNING *';
      const values = [status, orderId];
  
      try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
      } catch (err) {
        console.error('Error updating order status:', err);
        throw err;
      }
    }

    static async deleteOrderByAdmin(orderId) {
      const query = 'DELETE FROM "Orders" WHERE "order_id" = $1 RETURNING *';
      const values = [orderId];
  
      try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
      } catch (err) {
        console.error('Error deleting order:', err);
        throw err;
      }
    }

    //tested
    static async updateAcceptanceStatus (req, res){
      const { order_id } = req.params;  
      const courier_id = req.user.id;

      const insertAssignmentQuery = 'INSERT INTO "Assignments" (order_id, courier_id, status) VALUES ($1, $2, \'Accepted\') RETURNING *';
      const updateOrderQuery = 'UPDATE "Orders" SET "status" = \'Accepted\', "courier_id" = $1 WHERE "order_id" = $2 RETURNING *';
      const values = [order_id, courier_id];

      try {
        const assignmentResult = await pool.query(insertAssignmentQuery, values);
        const orderResult = await pool.query(updateOrderQuery, [courier_id, order_id]);
        return orderResult.rows[0]; 
      } catch (err) {
        console.error('Error accepting order:', err);
        throw err;
      }
    }

    //tested
    static async displayAllPendingOrders(){
      const query = 'SELECT * FROM "Orders" WHERE status = $1';
      const values = ['Pending']; 
      try {
        const result = await pool.query(query,values);
        return result.rows; 
      } catch (err) {
        console.error('Error fetching unassigned orders:', err);
        throw err;
      }
    }

  }

module.exports = Order;
