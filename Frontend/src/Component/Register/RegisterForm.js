import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  // Sets the input field with specific value
  const handleChange = (e) => {
    const { id, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User registered:', data);
        swal({
          title: "Register successful",
          text: "Welcome Abroad!!",
          icon: "success",
          timer: 4000, 
          buttons: false 
        });
        navigate('/login');
      } else {
        console.error(data.error);
        swal({
          title: "Register failed",
          text: "Couldn't register , please try again",
          icon: "error",
          timer: 4000, 
          buttons: false 
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      swal({
        title: "Register failed",
        text: "Couldn't register , please try again",
        icon: "error",
        timer: 4000, 
        buttons: false 
      });
    }
  };

  return (
    <div>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 col-lg-4" style={{ textAlign: "left" }}>
          <form className="form-control p-4" onSubmit={submitHandler}>
            <header className="text-center mb-2" style={{ padding: "40px", paddingBottom: "55px", textAlign: "left", fontWeight: "bold", fontSize: "22px" }}>
              Create a new account and start your shipping journey with us
            </header>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" id="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" id="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input type="tel" id="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
              <div id="passwordHelpBlock" className="form-text" style={{ fontWeight: "lighter" }}>
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
              </div>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-outline-secondary btn-lg" style={{ fontWeight: "bold" }}>Sign up</button>
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <p>Have an account?</p>
                <p onClick={() => navigate('/login')} style={{ cursor: "pointer", fontWeight: "bold", marginLeft: "8px" }}>Login</p>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
