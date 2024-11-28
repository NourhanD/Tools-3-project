import WebsiteTemplate from '../Component/WebsiteTemplate/WebsiteTemplate';
import manageOrders from '../Component/Icons/manageOrderAdmin.png';
import assignCourier from '../Component/Icons/6414639.png';
import { useNavigate } from 'react-router-dom';

function AdminHomePage() {
    const navigate = useNavigate()
    return (
        <div>
            <WebsiteTemplate />
            <div style={{ position: "absolute", top: "60px", left: "30px" }}>
                <h3 style={{ fontSize: "40px" ,fontWeight:"bold" }}>Hello</h3>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", gap: "120px" }}>
                <div>
                <img src={manageOrders} className="card-img-top" alt="createOrderIcon" style={{ width: "100%", height: "250px", objectFit:'scale-down', margin: "0 auto" }} />
                <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/manageOrders')} style={{ fontWeight: "bold" , marginTop:"25px" , fontSize:"25px"  }} >Manage orders</button>
                </div>

            
                <div>
                <img src={assignCourier} className="card-img-top" alt="previousOrders" style={{ width: "70%", height: "230px", objectFit:"contain", margin: "0 auto" , marginLeft:"10px"}} />
                <button className="btn btn-outline-secondary btn-lg" style={{ fontWeight: "bold" , marginTop:"20px" , fontSize:"25px" }}  onClick={() => navigate('/adminAssignmentToCourier')} >Assign Order to Courier</button>
                </div> 
               
                </div>
         
        </div>
    );
}

export default AdminHomePage;
