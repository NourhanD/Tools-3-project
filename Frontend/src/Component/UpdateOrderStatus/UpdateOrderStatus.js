import React from 'react';

const UpdateOrderDetails = (props) => {
    const { orderNumber, pickup, dropoff, packageDetails } = props;

    return (
        <div className="row justify-content-center align-items-start my-2">
            <div className="col-md-6 col-lg-4" style={{ textAlign: "left", padding: "10px" }}>
                <form className="form-control p-3" style={{ fontSize: "0.9rem" }}>
                    <header className="mb-2" style={{ fontWeight: "bold", fontSize: "18px", textAlign: "left" }}>
                        Order Number: {orderNumber}
                    </header>

                    <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>Pickup Location: {pickup}</label>
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>Dropoff Location: {dropoff}</label>
                    <label style={{ display: "block", marginBottom: "12px", fontWeight: "bold" }}>Package Details: {packageDetails}</label>
                    
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                        <label style={{ fontWeight: "bold" }}>Status</label>
                        <select style={{
                            marginLeft: "10px",
                            backgroundColor: "#f8f9fa", 
                            border: "1px solid #ced4da",
                            padding: "5px 10px",      
                            borderRadius: "6px",    
                            color: "#495057",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                        }}>
                            <option>Pickup</option>
                            <option>In transit</option>
                            <option>Delivered</option>
                        </select>
                    </div>

                    <div className="d-grid gap-1 col-6 mx-auto">
                        <button type="button" className="btn btn-outline-success" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateOrderDetails;
