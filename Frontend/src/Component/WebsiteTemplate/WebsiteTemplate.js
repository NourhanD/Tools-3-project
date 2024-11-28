import truck from "../Icons/truck.png";
import delivery from '../Icons/smiling-deliveryman-with-box-in-hands-png.png';

function WebsiteTemplate() {
    return (
        <div>
            <img
                src={truck}
                className="position-fixed"
                style={{
                    width: "280px",
                    height: "280px",
                    bottom: "0",
                    right: "40px",
                    marginTop: "90px",
                }}
                alt="Truck Icon"
            />

            <img
                src={delivery}
                className="position-fixed"
                style={{
                    width: "200px",
                    height: "200px",
                    bottom: "30px",
                    left: "40px",
                }}
                alt="Delivery Man Icon"
            />
        </div>
    );
}

export default WebsiteTemplate;
