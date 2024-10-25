import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageNotFound() {
    const navigate = useNavigate();
  
     // Redirect to login page after 3000ms from redirecting a wrong path(3 seconds)
    useEffect(() => {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 5000);
  
      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [navigate]);
  
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "40px",
          color: "red",
          fontWeight: "bold",
        }}
      >
        404 - Page Not Found
      </div>
    );
  
  }

  export default PageNotFound