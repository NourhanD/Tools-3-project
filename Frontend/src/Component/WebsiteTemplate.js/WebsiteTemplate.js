import truck from "../Icons/truck.png" 
import delivery from '../Icons/smiling-deliveryman-with-box-in-hands-png.png'

function WebsiteTemplate(){
    return(
    <div>
        <img 
        src={truck} 
        className="position-absolute bottom-0 end-0" 
        style={{ width: "370px", height: "370px" , marginRight:"40px",marginTop:"90px"}} 
        alt="Truck Icon"
      />

        <img 
            className="position-absolute bottom-0 start-0" 
            src={delivery} 
            style={{ width: "290px", height: "290px" , marginBottom:"30px" , marginLeft:"40px"}} 
            alt="Cloud Icon" 
        />

        </div>
    )
}

export default WebsiteTemplate