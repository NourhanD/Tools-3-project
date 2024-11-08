const pool = require('../db'); 

class User {
  static async register(firstName, lastName, phoneNumber, email, password, role) {
    let query;
      if (role === 'Courier') {
        query = 'INSERT INTO "Courier" ("firstName", "lastName", "phoneNumber", "email", "password") VALUES ($1, $2, $3, $4, $5) RETURNING *';
      } else {
        query = 'INSERT INTO "User" ("firstName", "lastName", "phoneNumber", "email", "password", "role") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      }
      const values = role === 'Courier' ? [firstName, lastName, phoneNumber, email, password] : [firstName, lastName, phoneNumber, email, password, role];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error creating user:', err);
      throw err; 
    }
  }
  
  static async findByEmail(email) {
    const queries = [
      { query: 'SELECT * FROM "User" WHERE "email" = $1', role: 'customer' },
      { query: 'SELECT * FROM "Courier" WHERE "email" = $1', role: 'courier' }
    ];
    const values = [email];  
  
    try {
      for (const { query } of queries) {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
          return result.rows[0];
        }
      }
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    }
  }
}
module.exports = User;
