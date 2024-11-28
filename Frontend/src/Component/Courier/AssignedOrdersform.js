import React, { useState, useEffect } from 'react';

const AssignedOrdersForm = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending orders data from the backend
  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/neworders'); // Using the correct backend route

        if (!response.ok) {
          throw new Error('Failed to fetch pending orders');
        }

        const data = await response.json();
        setOrders(data.newOrders); // Assuming 'newOrders' contains the list of pending orders
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []); // Runs once when the component mounts

  // Handle the Accept action
  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); // Ensure auth token is included if needed
      const response = await fetch(`http://localhost:5000/order/${id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Capture error response details for better debugging
        throw new Error(errorData.message || 'Failed to accept the order');
      }
  
      const updatedOrder = await response.json(); // Parse the response to get the updated order data
  
      // Update the local state to reflect the accepted status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, ...updatedOrder } : order
        )
      );
    } catch (err) {
      console.error('Error accepting the order:', err);
    }
  };
  

  const handleDecline = (id) => {
    
    setOrders((prevOrders) => {
        const updatedOrders = prevOrders.filter((order) => order.id !== id); 
        localStorage.setItem('orders', JSON.stringify(updatedOrders)); 
        setOrders(updatedOrders);
        //return updatedOrders;
    });

    alert("Order declined successfully.");
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
                          onClick={() => handleDecline(order.id)}
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
