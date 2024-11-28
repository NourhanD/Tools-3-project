import React, { useEffect, useState } from 'react';
import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import AdminAssignmentsToCourier from "../Component/AdminAssignmentsToCouriers/AdminAssignmentsToCouriers";

function AdminAssignmentsToCourierPage() {
    const [orders, setOrders] = useState([]);
    const [couriers, setCouriers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrdersAndCouriers = async () => {
            const token = localStorage.getItem('authToken');
            try {
                // Fetch orders
                const ordersResponse = await fetch('http://localhost:5000/assignedOrders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch couriers
                const couriersResponse = await fetch('http://localhost:5000/couriers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (ordersResponse.ok && couriersResponse.ok) {
                    const ordersData = await ordersResponse.json();
                    const couriersData = await couriersResponse.json();

                    setOrders(ordersData);
                    setCouriers(couriersData.map((courier) => ({
                        id: courier.courier_id,
                        name: courier.name,
                    }))); // Extract names for dropdown
                } else {
                    throw new Error('Failed to fetch orders or couriers');
                }
            } catch (err) {
                console.error('Error fetching orders or couriers:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndCouriers();
    }, []);

    const handleAssignCourier = async (orderId, courierId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:5000/assignCourier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId, courierId }),
            });

            if (response.ok) {
                alert('Courier assigned successfully!');
         
            } else {
                throw new Error('Failed to assign courier');
            }
        } catch (err) {
            console.error('Error assigning courier:', err);
            alert('Error assigning courier. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {orders.map((order) => (
                <AdminAssignmentsToCourier
                    key={order.order_id}
                    orderNumber={order.order_id}
                    pickup={order.pickup_loc}
                    dropoff={order.dropoff_loc}
                    packageDetails={order.package_details}
                    courierNames={couriers} // Pass the courier names for the dropdown
                    assignedCourierId={order.courier_id}
                    onAssignCourier={handleAssignCourier}
                />
            ))}
            <WebsiteTemplate />
        </div>
    );
}

export default AdminAssignmentsToCourierPage;
