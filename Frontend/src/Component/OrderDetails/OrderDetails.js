import { useLocation,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import React from "react";

const OrderDetails = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderData } = location.state; 
    const orderId = orderData.order_id; 

    const { orderNumber, pickup, dropoff, packageDetails, courierName, courierNumber, status } = props;

    const handleCancelOrder = async (id) => {
        const token = localStorage.getItem('authToken');
        try {
            // Pass the order ID directly in the URL (path param)
            const response = await fetch(`https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/order/${id}/cancel`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                swal({
                    title: "Success",
                    text: "Order canceled successfully.",
                    icon: "success",
                    timer: 2000,
                    buttons: false,
                });
               // navigate('/listOrdersPage', { state: { orderData: data } }); 
            } else {
                swal({
                    title: "Failed",
                    text: "Failed to cancel the order.",
                    icon: "error",
                    timer: 2000,
                    buttons: false,
                });
            }
        } catch (error) {
            console.error('Error canceling the order:', error);
            swal({
                title: "Error",
                text: "An error occurred while canceling the order.",
                icon: "error",
                timer: 2000,
                buttons: false,
            });
        }
    };

    return (
        <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-6 col-lg-4" style={{ textAlign: "left" }}>
                <header className="text-center mb-2" style={{ padding: "40px", paddingBottom: "55px", textAlign: "left", fontWeight: "bold", fontSize: "22px" }}>
                    Order Number : {orderNumber}
                </header>
                <form className="form-control p-4">
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold"}}>Pickup Location : {pickup}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Dropoff Location : {dropoff}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Package Details : {packageDetails}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Courier Name : {courierName}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Courier Number : {courierNumber}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Status : {status}</label>
                    <div className="d-grid gap-1 col-4 mx-auto">
                        <button
                            type="button"
                            className="btn btn-outline-danger align-center"
                            disabled={status !== "Pending"}
                            onClick={() => handleCancelOrder(orderId)}>

                            Cancel order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrderDetails;
