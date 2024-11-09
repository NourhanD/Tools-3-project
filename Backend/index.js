const userController = require('./Controller/userController');
const orderController = require('./Controller/orderController');
const authenticate = require('./Middleware/authentication');
const authenticateAndCheckCourier = require('./Middleware/authentication');
const express = require('express');
const cors = require('cors'); 
const pool = require('./db');
const dotenv = require('dotenv');
const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.post('/register', userController.register); //customer or courier

app.post('/login',userController.login); //customer or courier or admin

app.post('/order', authenticate, orderController.createOrder) //customer

app.get('/myorders', authenticate, userController.getUserOrders); //customer

app.get('/myorder/:orderId', authenticate, orderController.getOrderById); //customer

app.delete('/order/:orderId/cancel', authenticate, orderController.cancelOrder); //customer

app.get('/courier/orders', authenticateAndCheckCourier, orderController.getAssignedOrders); //courier

app.put('/updateStatus/:orderId', authenticateAndCheckCourier, orderController.updateOrderStatus); //courier

app.get('/assignedOrders', authenticate,userController.isAdmin, orderController.getOrdersWithAssignments); //admin

app.get('/orders', authenticate, userController.isAdmin, orderController.getAllOrders); //admin

app.put('/orderU/:orderId',authenticate, userController.isAdmin, orderController.updateOrderStatusByAdmin); //admin

app.delete('/orderD/:orderId',authenticate, userController.isAdmin, orderController.deleteOrder); //admin

app.get('/neworders', orderController.getPendingOrders); //courier

app.put('/order/:order_id/accept', authenticateAndCheckCourier, orderController.acceptOrder); //courier


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
