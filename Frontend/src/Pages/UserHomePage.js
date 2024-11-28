import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate"
import createOrderIcon from '../Component/Icons/orders-icon-5.jpg';
import previousOrders from '../Component/Icons/Screenshot-2022-11-24-132227.png';
import { useNavigate } from 'react-router-dom';

function UserHomePage() {
    const navigate = useNavigate()
    
    return (
        <div>
            <WebsiteTemplate />
            <div style={{ position: "absolute", top: "60px", left: "30px" }}>
                <h3 style={{ fontSize: "40px" ,fontWeight:"bold" }}>Hello</h3>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", gap: "120px" }}>
                <div>
                <img src={createOrderIcon} className="card-img-top" alt="createOrderIcon" style={{ width: "100%", height: "250px", objectFit:'scale-down', margin: "0 auto" }} />
                <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/createOrderPage')} style={{ fontWeight: "bold" , marginTop:"25px" , fontSize:"25px"  }} >Start ordering</button>
                </div>

            
                <div>
                <img src={previousOrders} className="card-img-top" alt="previousOrders" style={{ width: "90%", height: "250px", objectFit:"contain", margin: "0 auto" }} />
                <button className="btn btn-outline-secondary btn-lg" style={{ fontWeight: "bold" , marginTop:"20px" , fontSize:"25px" }}  onClick={() => navigate('/listOrdersPage')}>My orders</button>
                </div> 
               
                </div>
         
        </div>
    );
}

export default UserHomePage;
