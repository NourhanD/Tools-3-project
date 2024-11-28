import React, { useState } from 'react';

const ManageOrdersForm = ({ 
    orderNumber, 
    pickup, 
    dropoff, 
    packageDetails, 
    status, 
    firstName,  
    onUpdateStatus, 
    onDeleteOrder,
    courierId 
}) => {
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleStatusChange = (e) => {
        setCurrentStatus(e.target.value);
    };

    return (
        <div className="row justify-content-center align-items-start my-2">
            <div className="col-md-6 col-lg-4" style={{ textAlign: "left", padding: "10px" }}>
                <form
                    className="form-control p-3"
                    style={{ fontSize: "0.9rem" }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <header
                        className="mb-2"
                        style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            textAlign: "left",
                        }}
                    >
                        Order ID: {orderNumber}
                    </header>
    
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>
                        Customer ID: {firstName} 
                    </label>
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>
                        Pickup Location: {pickup}
                    </label>
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>
                        Dropoff Location: {dropoff}
                    </label>
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>
                        Package Details: {packageDetails}
                    </label>
    
                    {courierId && (
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
                    )}
    
                    <div className="d-grid gap-1 col-6 mx-auto">
                        {courierId && (
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                                onClick={() => onUpdateStatus(orderNumber, currentStatus)}
                            >
                                Save Changes
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                            onClick={() => onDeleteOrder(orderNumber)}
                        >
                            Delete Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );    
}    

export default ManageOrdersForm;
