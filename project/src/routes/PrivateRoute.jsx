import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const token = localStorage.getItem("user-token") || "";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {token ? (
        children
      ) : (
        <Navigate state={location.pathname} replace={true} to="/login" />
      )}
    </>
  );
};
