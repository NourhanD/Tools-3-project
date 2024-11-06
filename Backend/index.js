const userController = require('./Controller/userController');
const authenticate = require('./Middleware/authentication');
const express = require('express');
const cors = require('cors'); 
const pool = require('./db');
const dotenv = require('dotenv');
const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.post('/register', userController.register);

app.post('/login',userController.login);

app.post('/order', authenticate, userController.createOrder)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
  pool.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to PostgreSQL database');
    }
  });
}

module.exports = app;
