import React, { useState, useEffect } from 'react';

const AdminAssignmentsToCourier = (props) => {
    const { orderNumber, pickup, dropoff, packageDetails, courierNames, assignedCourierId, onAssignCourier } = props;
    const [selectedCourier, setSelectedCourier] = useState("");

    useEffect(() => {
        setSelectedCourier(assignedCourierId || "");
      }, [assignedCourierId]);

    const handleAssignClick = () => {
        if (selectedCourier) {
            onAssignCourier(orderNumber, selectedCourier); // Trigger the assignment in the parent component
        } else {
            alert('Please select a courier before assigning.');
        }
    };

    return (
        <div className="row justify-content-center align-items-start my-2">
            <div className="col-md-6 col-lg-4" style={{ textAlign: 'left', padding: '10px' }}>
                <form className="form-control p-3" style={{ fontSize: '0.9rem' }}>
                    <header className="mb-2" style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'left' }}>
                        Order Number: {orderNumber}
                    </header>

                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
                        Pickup Location: {pickup}
                    </label>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
                        Dropoff Location: {dropoff}
                    </label>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
                        Package Details: {packageDetails}
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <label style={{ fontWeight: 'bold' }}>Courier Name</label>
                        <select
                            value={selectedCourier}
                            onChange={(e) => setSelectedCourier(e.target.value)}
                            style={{
                                marginLeft: '10px',
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #ced4da',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                color: '#495057',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                            }}
                        >
                            {courierNames.map((courier) => (
                                <option key={courier.id} value={courier.id}>
                                    {courier.firstName} 
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="d-grid gap-1 col-6 mx-auto">
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            style={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                            onClick={handleAssignClick}
                        >
                            Assign Courier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAssignmentsToCourier;
