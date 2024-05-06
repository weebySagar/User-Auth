import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="vh-100 w-100 d-flex flex-column justify-content-center">
      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
