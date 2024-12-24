import { useState, useEffect } from "react";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function ListOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('authToken');

            try {
                const response = await fetch('https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/myorders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                    swal({
                        title: "Orders Loaded",
                        text: "Your orders have been successfully found",
                        icon: "success",
                        timer: 2000,
                        buttons: false
                    });
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                swal({
                    title: "Load Failed",
                    text: "Couldn't fetch orders, please try again",
                    icon: "error",
                    timer: 2000,
                    buttons: false
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleOrderDetailsClick = async (orderId) => {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch('https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/orderdetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ orderId })
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/orderDetails', { state: { orderData: data } });
            } else {
                swal({
                    title: "Fetch Failed",
                    text: "Couldn't fetch order details, please try again",
                    icon: "error",
                    timer: 2000,
                    buttons: false
                });
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
            swal({
                title: "Fetch Failed",
                text: "Couldn't fetch order details, please try again",
                icon: "error",
                timer: 2000,
                buttons: false
            });
        }
    };

    return (
        <div>
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-8 col-lg-6">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            {orders.length > 0 ? (
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
                                                   <td style={{ paddingTop: "25px" }}>{order.order_id}</td>
                                                    <td>
                                                        <span className={`badge ${
                                                            order.status === 'Delivered'
                                                                ? 'bg-success'
                                                                : order.status === 'In Progress'
                                                                ? 'bg-warning'
                                                                : 'bg-secondary'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm"
                                                            style={{
                                                                fontWeight: "bold",
                                                                marginTop: "20px",
                                                                fontSize: "10px",
                                                                marginLeft: "70px",
                                                                marginBottom: "20px"
                                                            }}
                                                            onClick={() => handleOrderDetailsClick(order.order_id)}
                                                        >
                                                            Order Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div>No orders found</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListOrders;
