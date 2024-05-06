import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthPage from "../pages/AuthPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage Component={HomePage} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default Routers;
