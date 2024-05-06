import React, { useState } from "react";
import toast from "react-hot-toast";

import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
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

    // Name validation
    if (userData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

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
      toast.promise(registerUser(userData), {
        loading: "Hang on...",
        success: () => {
          setUserData({
            email: "",
            name: "",
            password: "",
          });
          navigate("/login");
          return "User created sucessfully";
        },
        error: (e) => e,
      });
    }
  };
  return (
    <div className="rounded shadow p-4">
      <h4>Register</h4>
      <p>Create new account</p>

      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              name="name"
              onChange={handleChange}
              value={userData.name}
            />
            {errors.name && <p className="text-danger fs-6">{errors.name}</p>}
          </div>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
