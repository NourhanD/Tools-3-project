import React, { useEffect, useState } from 'react';
import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import OrderDetails from "../Component/OrderDetails/OrderDetails";

function OrderDetailsPage() {
    const [orderData, setOrderData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch data from your backend API
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch('/api/order'); // Replace '/api/order' with your actual API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch order details");
                }
                const data = await response.json();
                setOrderData(data); 
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    if (loading) return <p>Loading order details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <WebsiteTemplate />
            {orderData && (
                <OrderDetails
                    orderNumber={orderData.orderNumber}
                    pickup={orderData.pickup}
                    dropoff={orderData.dropoff}
                    packageDetails={orderData.packageDetails}
                    courierName={orderData.courierName}
                    courierNumber={orderData.courierNumber}
                    status={orderData.status}
                />
            )}
        </div>
    );
}

export default OrderDetailsPage;
