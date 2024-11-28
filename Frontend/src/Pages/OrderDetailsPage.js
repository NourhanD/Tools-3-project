import { useLocation } from 'react-router-dom';
import WebsiteTemplate from "../Component/WebsiteTemplate/WebsiteTemplate";
import OrderDetails from "../Component/OrderDetails/OrderDetails";

function OrderDetailsPage() {
    const location = useLocation();
    const { orderData } = location.state || {}; 

    if (!orderData) return <p>Order data not available.</p>;

    return (
        <div>
            <WebsiteTemplate />
            <OrderDetails
              orderNumber={orderData.order_id}
              pickup={orderData.pickup_loc}
              dropoff={orderData.dropoff_loc}
              packageDetails={orderData.package_details}
              courierName={orderData.firstName}
              courierNumber={orderData.phoneNumber}
              status={orderData.status}
              />

        </div>
    );
}

export default OrderDetailsPage;
