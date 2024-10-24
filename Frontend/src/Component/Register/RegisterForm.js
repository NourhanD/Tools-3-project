    function RegisterForm() 
  {
        return (
        <div>
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-6 col-lg-4" style={{ textAlign:"left"}}>
              <form className="form-control p-4">
                <header className="text-center mb-2" style={{padding:"40px", paddingBottom:"55px" ,textAlign:"left" , fontWeight:"bold", fontSize:"22px" }} >
                  Create a new account and start your shipping journey with us
                </header>
                
                <div className="mb-3" >
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" id="firstName" className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" id="lastName" className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input type="tel" id="phoneNumber" className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" id="email" className="form-control" />
                </div>

                
                <div className="mb-3">
                  <label htmlFor="inputPassword5" className="form-label">Password</label>
                  <input type="password" id="inputPassword5" className="form-control" />
                  <div id="passwordHelpBlock" className="form-text" style={{fontWeight:"lighter"}}>
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                  </div>
                </div>
                
                <div className="d-grid gap-2 col-6 mx-auto">
                <button type="button" class="btn btn-outline-secondary btn-lg" style={{fontWeight:"bold" }}>Sign up</button>
                </div>
              
              </form>
            </div>
          </div>

        
        </div>
      );
    }

  export default RegisterForm;
