import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-4" style={{ textAlign: "left" }}>
        <form className="form-control p-4">
          <header
            className="text-center mb-2"
            style={{
              padding: "40px",
              paddingBottom: "20px",
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            Sign in to your account
          </header>

          {/* New to us? Create account */}
          <p className="text-center" style={{ marginBottom: "30px", fontSize: "16px" }}>
            New to us? <a href="/signup" style={{ fontWeight: "bold", textDecoration: "none" }}>Create an account</a>
          </p>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" id="email" className="form-control" />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="inputPassword5" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="inputPassword5"
                className="form-control"
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              >
                <i className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
            {/* Line under the password box */}
            <p className="form-text text-muted" style={{ marginTop: "5px" }}>
              Please make sure to write your password in English.
            </p>
          </div>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ fontWeight: "bold" }}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
