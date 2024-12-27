import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

const AssignedOrdersForm = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending orders data from the backend
  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await fetch('https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/neworders'); // Using the correct backend route

        if (!response.ok) {
          throw new Error('Failed to fetch pending orders');
        }

        const data = await response.json();
        setOrders(data.newOrders); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []); 

  // Handle the Accept action
  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await fetch(`https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/order/${id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Failed to accept the order');
      }
      swal('Success', 'Order Accepted successfully!', 'success');
  
      setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== id));
    } catch (err) {
      console.error('Error accepting the order:', err);
      swal('Failed', 'Error accepting order. Please try again.', 'error');
    }
  };
  

  const handleDecline = (id) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.order_id !== id)
    );

    swal({
      title: "Order Declined",
      text: "You've declined the order",
      icon: "success",
      timer: 1700,
      buttons: false 
    });
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Pending Orders</h2>
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
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="3">No pending orders.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_id}</td>
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
                          onClick={() => handleAccept(order.order_id)}
                          disabled={order.status !== 'Pending'}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDecline(order.order_id)}
                          disabled={order.status !== 'Pending'}
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedOrdersForm;
