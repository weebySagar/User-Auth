import React, { useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(userData.email.trim())) {
      newErrors.email = "Invalid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Name validation
    if (userData.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.promise(loginUser(userData), {
        loading: "Hang on...",
        success: (res) => {
          setUserData({
            email: "",
            password: "",
          });
          login(res.user, res.token);
          navigate("/", { replace: true });
          return "User login successfully";
        },
        error: (e) => e,
      });
    }
  };
  return (
    <div className="rounded shadow p-4">
      <h4>Log In</h4>
      <p>Already have an account</p>

      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleChange}
              value={userData.email}
            />
            {errors.email && <p className="text-danger fs-6">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              value={userData.password}
            />
            {errors.password && (
              <p className="text-danger fs-6">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
