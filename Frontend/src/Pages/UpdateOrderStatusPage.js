import React, { useEffect, useState } from 'react';
import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import UpdateOrderDetails from "../Component/UpdateOrderStatus/UpdateOrderStatus";

function UpdateOrderStatusPage() {
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        // Fetch data from your API endpoint
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders'); 
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
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
                <UpdateOrderDetails 
                    key={order.orderNumber} 
                    orderNumber={order.orderNumber}
                    pickup={order.pickup}
                    dropoff={order.dropoff}
                    packageDetails={order.packageDetails}
                    courierName={order.courierName}
                    courierNumber={order.courierNumber}
                    status={order.status}
                />
            ))}
            <WebsiteTemplate />
        </div>
    );
}

export default UpdateOrderStatusPage;
