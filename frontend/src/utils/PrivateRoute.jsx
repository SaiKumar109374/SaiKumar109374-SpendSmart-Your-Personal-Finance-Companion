import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the provided component
  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
