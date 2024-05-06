import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthPage = ({ Component, ...rest }) => {
  const { user } = useAuth();

  if (user) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AuthPage;
