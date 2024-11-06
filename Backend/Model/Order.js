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
}

module.exports = Order;
