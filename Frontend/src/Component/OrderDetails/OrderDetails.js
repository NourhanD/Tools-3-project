const OrderDetails = (props) => {
    const { orderNumber, pickup, dropoff, packageDetails, courierName, courierNumber, status } = props;

    return (
        <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-6 col-lg-4" style={{ textAlign: "left" }}>
            <header className="text-center mb-2" style={{ padding: "40px", paddingBottom: "55px", textAlign: "left", fontWeight: "bold", fontSize: "22px" }}>
              Order Number : {orderNumber}
            </header>
                <form className="form-control p-4">
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold"}}>Pickup Location : {pickup}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Dropoff Location : {dropoff}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Package Details : {packageDetails}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Courier Name : {courierName}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Courier Number : {courierNumber}</label>
                    <label style={{ display: "block", marginBottom: "20px", fontWeight:"bold" }}>Status : {status}</label>
                    <div className="d-grid gap-1 col-4 mx-auto">
                    <button type="button" className="btn btn-outline-danger align-center " disabled={status !== "Pending"} >Cancel order</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default OrderDetails;
