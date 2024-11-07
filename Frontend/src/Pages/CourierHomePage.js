import WebsiteTemplate from '../Component/WebsiteTemplate/WebsiteTemplate';
import pendingOrders from '../Component/Icons/R (3).png';
import updateOrderStatus from '../Component/Icons/48-Delivery_Man-512.jpg';
import { useNavigate } from 'react-router-dom';

function CourierHomePage() {
    const navigate = useNavigate()
    return (
        <div>
            <WebsiteTemplate />
            <div style={{ position: "absolute", top: "60px", left: "30px" }}>
                <h3 style={{ fontSize: "40px" ,fontWeight:"bold" }}>Hello username</h3>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", gap: "120px" }}>
                <div>
                <img src={pendingOrders} className="card-img-top" alt="createOrderIcon" style={{ width: "100%", height: "250px", objectFit:'scale-down', margin: "0 auto" }} />
                <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/pendingOrders')} style={{ fontWeight: "bold" , marginTop:"25px" , fontSize:"25px"  }} >Pending orders</button>
                </div>

            
                <div>
                <img src={updateOrderStatus} className="card-img-top" alt="previousOrders" style={{ width: "90%", height: "250px", objectFit:"contain", margin: "0 auto" }} />
                <button className="btn btn-outline-secondary btn-lg" style={{ fontWeight: "bold" , marginTop:"20px" , fontSize:"25px" }}  onClick={() => navigate('/updateOrderStatus')} >Update Order Status</button>
                </div> 
               
                </div>
         
        </div>
    );
}

export default CourierHomePage;
