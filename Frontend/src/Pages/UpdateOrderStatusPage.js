import React, { useEffect, useState } from 'react';
import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import UpdateOrderStatus from "../Component/UpdateOrderStatus/UpdateOrderStatus";

function UpdateOrderStatusPage() {
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); // Initialize error with a setter

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch('http://localhost:5000/courier/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Fixed the template literal
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                    setError('Failed to fetch orders'); // Set error if response is not ok
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {orders.map((order) => (
                <UpdateOrderStatus
                    key={order.order_id} 
                    orderNumber={order.order_id}
                    pickup={order.pickup_loc}
                    dropoff={order.dropoff_loc}
                    packageDetails={order.package_details}
                    status={order.status}
                />
            ))}
            <WebsiteTemplate />
        </div>
    );
}

export default UpdateOrderStatusPage;
