import React, { useState, useEffect } from 'react';
import ManageOrdersForm from "../Component/Admin/ManageOrderForm";
import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import swal from 'sweetalert';

function AdminManageOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch('https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    setError('Failed to fetch orders');
                }
            } catch (err) {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderNumber, newStatus) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/orderU/${orderNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order_id === orderNumber ? { ...order, status: newStatus } : order
                    )
                );
                swal('Success', 'Order status updated successfully.', 'success');
            } else {
                console.error('Failed to update order status');
                swal('Failed', 'Failed to update order status.', 'error');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const deleteOrder = async (orderNumber) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/orderD/${orderNumber}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderNumber));
                swal('Success', 'Order deleted successfully.', 'success');
            } else {
                console.error('Failed to delete order');
                swal('Failed', 'Failed to delete order.', 'error');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {orders.map((order) => (
                <ManageOrdersForm
                    key={order.order_id}
                    orderNumber={order.order_id}
                    pickup={order.pickup_loc}
                    dropoff={order.dropoff_loc}
                    packageDetails={order.package_details}
                    firstName={order.user_id}
                    status={order.status}
                    onUpdateStatus={updateOrderStatus}
                    onDeleteOrder={deleteOrder}
                    courierId={order.courier_id}
                />
            ))}
            <WebsiteTemplate />
        </div>
    );
}

export default AdminManageOrdersPage;
