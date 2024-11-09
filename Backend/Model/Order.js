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
        console.error('Error creating order:', err.message, err.stack);
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
    }static async cancelOrder(orderId, userId) {
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
}

module.exports = Order;
