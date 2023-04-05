import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";

const PrivateRoute = ({ children, path }) => {
  const [cookies, setCookie] = useCookies(["SID", "ASID"]);
  let location = useLocation();
  if ( window.location.pathname.startsWith("/admin")) {
    if (!cookies.ASID) {
      return <Navigate to="/admin/login" state={{ from: location }} />;
    }
    return children;
  }

  if (!cookies.SID) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
