import { useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from 'sweetalert'; // Ensure you have this import for swal

function CreateOrder() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        pickup: '',
        dropoff: '',
        packageDetails: '',
        deliveryTime :''
    });
    
    // Sets the input field with specific value
    const handleChange = (e) => {
        const { id, value } = e.target; 
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            if (response.status === 201) {
                console.log('Order Placed', data);
                swal({
                    title: "Order Placed",
                    text: "Sending the order to a courier",
                    icon: "success",
                    timer: 4000, 
                    buttons: false 
                });
                navigate('/home');
            } else {
                console.error(data.error);
                swal({
                    title: "Order Failed",
                    text: "Couldn't place order, please try again",
                    icon: "error",
                    timer: 4000, 
                    buttons: false 
                });
            }
        } catch (error) {
            console.error('Order Failed', error);
            swal({
                title: "Order failed",
                text: "Couldn't place order, please try again",
                icon: "error",
                timer: 4000, 
                buttons: false 
            });
        }
    };

    return (
        <div>
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-6 col-lg-4" style={{ textAlign: "left" }}>
                    <form className="form-control p-4" onSubmit={submitHandler}>
                        <header className="text-center mb-2" style={{ padding: "40px", paddingBottom: "55px", textAlign: "left", fontWeight: "bold", fontSize: "22px" }}>
                            Get Started on Your Shipping Journey: Place Your Order Now!
                        </header>
                    
                    <div className="mb-3">
                            <label htmlFor="pickup" className="form-label">Pickup Location</label>
                            <input type="text" id="pickup" className="form-control" value={formData.pickup} onChange={handleChange} />
                        </div>
        
                        <div className="mb-3">
                            <label htmlFor="dropoff" className="form-label">Dropoff Location</label>
                            <input type="text" id="dropoff" className="form-control" value={formData.dropoff} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="packageDetails" className="form-label">Package Details</label>
                            <input type="text" id="packageDetails" className="form-control" value={formData.packageDetails} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="deliveryTime" className="form-label" style={{marginTop:"15px"}}>Delivery Time</label>
                            <select style={{marginLeft:"20px"}} value={formData.deliveryTime} onChange={handleChange}>
                                <option> 8 am </option>
                                <option> 9 am </option>
                                <option> 10 am </option>
                                <option> 11 am </option>
                                <option> 12 pm </option>
                                <option> 1 pm </option>
                                <option> 2 pm </option>
                                <option> 3 pm </option>
                                <option> 4 pm </option>
                                <option> 5 pm </option>
                                <option> 6 pm </option>
                                <option> 7 pm </option>
                                <option> 8 pm </option>
                                <option> 9 pm </option>

                            </select>
                        </div>
                      
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" className="btn btn-outline-secondary btn-lg" style={{ fontWeight: "bold" , marginTop:"20px"}}>Place order</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateOrder;
