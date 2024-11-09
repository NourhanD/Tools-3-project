// ManageOrdersForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';

const ManageOrdersForm = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          <h2 className="text-center mb-4">Manage Orders</h2>
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'Shipped')}
                      className="mr-2"
                    >
                      Mark as Shipped
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'Delivered')}
                      className="mr-2"
                    >
                      Mark as Delivered
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageOrdersForm;
