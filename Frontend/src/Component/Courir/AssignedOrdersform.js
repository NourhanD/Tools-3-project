import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignedOrdersForm = () => {
  // Dummy order data for assigned orders
  const [orders, setOrders] = useState([
    { id: 1, status: 'Pending' },
    { id: 2, status: 'Accepted' },
    { id: 3, status: 'Declined' },
    { id: 4, status: 'Declined' },
  ]);

  const handleAccept = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: 'Accepted' } : order
      )
    );
  };

  const handleDecline = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: 'Declined' } : order
      )
    );
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Assigned Orders</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === 'Accepted'
                            ? 'bg-success'
                            : order.status === 'Declined'
                            ? 'bg-danger'
                            : 'bg-warning'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleAccept(order.id)}
                        disabled={order.status !== 'Pending'}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDecline(order.id)}
                        disabled={order.status !== 'Pending'}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedOrdersForm;
