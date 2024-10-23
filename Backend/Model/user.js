
const pool = require('../db'); 

class User {
  static async register(name, email, password, phone) {

    const query = 'INSERT INTO "User" ("name", "email", "password", "phone") VALUES ($1, $2, $3, $4) RETURNING *'; 
    const values = [name, email, password, phone];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error creating user:', err);
      throw err; 
    }
  }
  static async findByEmail(email) {
    const query = 'SELECT * FROM "User" WHERE "email" = $1';
    const values = [email];

    try {
      const result = await pool.query(query, values);
      return result.rows[0]; 
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    }
  }
}
module.exports = User;
