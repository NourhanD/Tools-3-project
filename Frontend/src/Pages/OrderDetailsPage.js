import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import OrderDetails from "../Component/OrderDetails/OrderDetails";

function OrderDetailsPage (){
    const DUMMYDATA =
        {
            orderNumber:"2389203" ,
            pickup:"Haram",
            dropoff:"Nasr city" ,
            packageDetails:"1 large package",
            courierName:"Mohamed",
            courierNumber:"0103282928",
            status:"Pending"
        }
    
    return (
        <div>
            <WebsiteTemplate/>
            <OrderDetails orderNumber={DUMMYDATA.orderNumber} pickup={DUMMYDATA.pickup} dropoff={DUMMYDATA.dropoff} packageDetails={DUMMYDATA.packageDetails} courierName={DUMMYDATA.courierName} courierNumber={DUMMYDATA.courierNumber} status={DUMMYDATA.status}/>
        </div>

    )
}

export default OrderDetailsPage;