import React, { useState } from 'react';
import swal from 'sweetalert';

const UpdateOrderStatus = ({ orderNumber, pickup, dropoff, packageDetails, status }) => {
    const [currentStatus, setStatus] = useState(status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSaveStatus = async (newStatus) => {
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`https://backend-nourhandarwish-dev.apps.rm2.thpm.p1.openshiftapps.com/updateStatus/${orderNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status :newStatus }),
            });

            if (response.ok) {
                swal('Success', 'Order status updated successfully.', 'success');
            } else {
                swal('Failed', 'Failed to update order status.', 'error');
            }
        } catch (err) {
            swal('Error', 'An error occurred while updating the status.', 'error');
        }
    };

    return (
<div className="row justify-content-center align-items-start my-2">
    <div className="col-md-6 col-lg-4" style={{ textAlign: "left", padding: "10px" }}>
        <form className="form-control p-3" style={{ fontSize: "0.9rem" }} onSubmit={(e) => e.preventDefault()}>
            <header className="mb-2" style={{ fontWeight: "bold", fontSize: "18px", textAlign: "left" }}>
                Order Number: {orderNumber}
            </header>

            <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>
                Pickup Location: {pickup}
            </label>
            <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>
                Dropoff Location: {dropoff}
            </label>
            <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>
                Package Details: {packageDetails}
            </label>
            
            <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <label style={{ fontWeight: "bold" }}>Status</label>
                <select
                    value={currentStatus}
                    onChange={handleStatusChange}
                    style={{
                        marginLeft: "10px",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        color: "#495057",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                    }}
                >
                    <option value="Pickup">Pickup</option>
                    <option value="In transit">In transit</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>

            <div className="d-grid gap-1 col-6 mx-auto">
                <button
                      onClick={() => handleSaveStatus(currentStatus)}
                    type="button"
                    className="btn btn-outline-success"
                    style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</div>
);
}

export default UpdateOrderStatus;
