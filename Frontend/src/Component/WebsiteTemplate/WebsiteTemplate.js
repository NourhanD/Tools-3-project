import truck from "../Icons/truck.png" 
import delivery from '../Icons/smiling-deliveryman-with-box-in-hands-png.png'

function WebsiteTemplate(){
    return(
    <div>
        <img 
        src={truck} 
        className="position-absolute bottom-0 end-0" 
        style={{ width: "280px", height: "280px" , marginRight:"40px",marginTop:"90px"}} 
        alt="Truck Icon"
      />

        <img 
            className="position-absolute bottom-0 start-0" 
            src={delivery} 
            style={{ width: "200px", height: "200px" , marginBottom:"30px" , marginLeft:"40px"}} 
            alt="Deliver man Icon" 
        />

        </div>
    )
}

export default WebsiteTemplate