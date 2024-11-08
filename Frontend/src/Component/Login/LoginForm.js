import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Function for toggling password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        })
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        
        // Store the auth token in localStorage
        localStorage.setItem('authToken', data.token);

        // Show success alert
        swal({
          title: "Login successful",
          text: "You've successfully logged in",
          icon: "success",
          timer: 2000,
          buttons: false 
        });

        // Navigate to the home page after login
        if (data.user.role === 'admin') {
          navigate('/adminHome');
      } else if (data.user.role === 'customer') {
          navigate('/home');
      } else {
          navigate('/courierHome');
      }

      } else {
        console.error(data.error);
        swal({
          title: "Login failed",
          text: "Couldn't log in, please try again",
          icon: "error",
          timer: 2000,
          buttons: false 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      swal({
        title: "Login failed",
        text: "Couldn't log in, please try again",
        icon: "error",
        timer: 2000,
        buttons: false 
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-4" style={{ textAlign: "left" }}>
        <form className="form-control p-4" onSubmit={submitHandler}>
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

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              >
                <i className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
            <p className="form-text text-muted" style={{ marginTop: "5px" }}>
              Please make sure to write your password in English.
            </p>
          </div>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="submit"
              className="btn btn-outline-secondary btn-lg"
              style={{ fontWeight: "bold" }}
            >
              Sign in
            </button>

            <div style={{ display: "flex", marginTop: "30px", fontSize: "16px" }}>
              <p className="text-center">New to us? </p>
              <p className="text-center" onClick={() => navigate('/register')} style={{ cursor: "pointer", marginLeft: '5px', fontWeight: "bold" }}>
                Create an account
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
