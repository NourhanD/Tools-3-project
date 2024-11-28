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
      const query = 'SELECT o.*, c."firstName", c."phoneNumber" FROM "Orders" o LEFT JOIN "Courier" c ON o."courier_id" = c."id" WHERE o."order_id" = $1';

      try {
        const result = await pool.query(query, [orderId]);
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
        const result = await pool.query(query, [orderId,userId]);
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
    static async displayCouriers() {
      try {
        const query = 'SELECT * FROM "Courier" ';
        const result = await pool.query(query);
  
        return result.rows;
      } catch (err) {
        console.error('Error checking if user is a courier:', err);
        throw err;
      }
    }

    static async checkAssignment(orderId, courierId) {
      const query = 'SELECT * FROM "Assignments" WHERE "order_id" = $1 AND "courier_id" = $2';
      try {
          const result = await pool.query(query, [orderId, courierId]);
          return result.rows[0] || null; // Return the assignment or null if not found
      } catch (err) {
          console.error('Error checking assignment:', err.message);
          throw new Error('Failed to check assignment');
      }
  }
  static async updateAssignmentStatus(assignmentId, status) {
    const query = 'UPDATE "Assignments" SET "status" = $1 WHERE "assignment_id" = $2 RETURNING *';
    try {
        const result = await pool.query(query, [status, assignmentId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating assignment status:', err.message);
        throw new Error('Failed to update assignment status');
    }
}
static async updateOrderStatus(orderId, courierId, status) {
  const query = 'UPDATE "Orders" SET "status" = $1, "courier_id" = $2 WHERE "order_id" = $3 RETURNING *';
  try {
      const result = await pool.query(query, [status, courierId, orderId]);
      return result.rows[0];
  } catch (err) {
      console.error('Error updating order status:', err.message);
      throw new Error('Failed to update order status');
  }
}


    
    //tested
    static async assignedOrders(courierId) {
      const query = 'SELECT * FROM "Orders" WHERE "courier_id" = $1';
  
      try {
        const res = await pool.query(query, [courierId]);
        return res.rows;
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
      const Assignmentquery = 'UPDATE "Assignments" SET "status" = $1 WHERE "order_id" = $2 RETURNING *';
      const values = [status, orderId];
  
      try {
        const result = await pool.query(query, values);
        const Assignresult = await pool.query(Assignmentquery, values);
        return result.rows[0]; 
      } catch (err) {
        console.error('Error updating order status:', err);
        throw err;
      }
    }

    static async deleteOrderByAdmin(orderId) {
      const deletefromAssignments = 'DELETE FROM "Assignments" WHERE "order_id" = $1 RETURNING *';
      const query = 'DELETE FROM "Orders" WHERE "order_id" = $1 RETURNING *';
      const values = [orderId];
  
      try {
        const deleteAssignments = await pool.query(deletefromAssignments, values);
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

    static async getOrdersWithAssignments() {
      const query = `
          SELECT o.*, a.courier_id, a.status AS assignment_status
          FROM "Orders" o
          RIGHT JOIN "Assignments" a ON o.order_id = a.order_id
      `;
      try {
          const result = await pool.query(query);
          return result.rows;
      } catch (error) {
          console.error('Error fetching orders with assignments:', error);
          throw error;
      }
  }

  static async reassignOrder(orderId, newCourierId) {
      const query = `
          UPDATE "Assignments"
          SET courier_id = $1
          WHERE order_id = $2
          RETURNING *
      `;
      const updateOrderQuery = `
            UPDATE "Orders"
            SET courier_id = $1
            WHERE order_id = $2
            RETURNING *;
        `;
        
      const values = [newCourierId, orderId];
      try {
          const result = await pool.query(query, values);
          const orderResult = await pool.query(updateOrderQuery, values);
          return result.rows[0];
      } catch (error) {
          console.error('Error reassigning order:', error);
          throw error;
      }
  }
}
module.exports = Order;
