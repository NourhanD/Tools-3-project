
const pool = require('../db'); 

class User {
  static async register(name, email, password) {

    const query = 'INSERT INTO "User" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *'; 
    const values = [name, email, password];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error creating user:', err);
      throw err; 
    }
  }
}
module.exports = User;
