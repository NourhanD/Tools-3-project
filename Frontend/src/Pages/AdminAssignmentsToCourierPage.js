import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import AdminAssingmentstoCourier from '../Component/AdminAssigmentsToCouriers/AdminAssigmentsToCouriers'

function AdminAssingmentstoCourierPage(){
    const DUMMYDATA =[
    {
        orderNumber:"wjednnud",
        pickup:"Nasr city",
        dropoff:"Haram",
        packageDetails:"1 package"

    }
,
    {
        orderNumber:"wjednnud",
        pickup:"Nasr city",
        dropoff:"Haram",
        packageDetails:"1 package"

    }
,
    {
        orderNumber:"wjednnud",
        pickup:"Nasr city",
        dropoff:"Haram",
        packageDetails:"1 package"

    }
       

]

const COURIERNAMES=["Ahmed ", "Mohamed" , "Seif", "Ali"]
    return(
        <div>
             
              {DUMMYDATA.map((order) => (
                <AdminAssingmentstoCourier 
                    key={order.orderNumber} 
                    orderNumber={order.orderNumber}
                    pickup={order.pickup}
                    dropoff={order.dropoff}
                    packageDetails={order.packageDetails}
                    courierNames={COURIERNAMES}
                />
            ))}

    <WebsiteTemplate/>
             
        </div>
      
    )
}


export default AdminAssingmentstoCourierPage;