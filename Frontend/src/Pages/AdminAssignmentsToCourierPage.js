import React, { useState, useEffect } from 'react';
import AdminAssignmentsToCourier from '../Component/AdminAssignmentsToCouriers/AdminAssignmentsToCouriers';
import WebsiteTemplate from '../Component/WebsiteTemplate/WebsiteTemplate';
import swal from 'sweetalert';

function AdminAssignmentsToCourierPage() {
    const [orders, setOrders] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrdersAndCouriers = async () => {
            const token = localStorage.getItem('authToken');
            try {
                // Fetch orders and couriers
                const [ordersResponse, couriersResponse] = await Promise.all([
                    fetch('https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/assignedOrders', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch('https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/couriers', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (!ordersResponse.ok || !couriersResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const ordersData = await ordersResponse.json();
                const couriersData = await couriersResponse.json();

                setOrders(ordersData);
                setCouriers(couriersData);
            } catch (err) {
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
            const response = await fetch(`https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/reassignOrder/${orderId}/${courierId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId, courierId }),
            });

            if (!response.ok) {
                throw new Error('Failed to assign courier');
            }
            swal('Success', 'Courier assigned successfully!', 'success');

        } catch (err) {
            console.error('Error assigning courier:', err);
            swal('Failed', 'Error assigning courier. Please try again.', 'error');
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
                    courierNames={couriers}
                    assignedCourierId={order.courier_id}
                    onAssignCourier={handleAssignCourier}
                />
            ))}
            <WebsiteTemplate />
        </div>
    );
}

export default AdminAssignmentsToCourierPage;
