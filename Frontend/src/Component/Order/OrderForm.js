import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderForm = () => {
  // Dummy order data with only ID and status
  const [orders, setOrders] = useState([
    { id: 1, status: 'Delivered' },
    { id: 2, status: 'In Progress' },
    { id: 3, status: 'Pending' },
  ]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">My Orders</h2>
        <div className="table-responsive">
          <table className="table table-hover text-center">
            <thead className="thead-light">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === 'Delivered'
                          ? 'bg-success'
                          : order.status === 'In Progress'
                          ? 'bg-warning'
                          : 'bg-secondary'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
