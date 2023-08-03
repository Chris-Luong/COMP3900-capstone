import { React } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

// Route wrapper component that checks if user is logged in before displaying user-only routes; code from https://www.robinwieruch.de/react-router-private-routes/
const AuthRoute = (props) => {
  const auth = localStorage.getItem("auth");
  if (props.requireLogin === true) {
    // current path requires user to be logged in
    if (auth === null) {
      console.log("redirecting to login...");
      return <Navigate to={props.redirectPath} replace={true} />;
    }
  } else {
    // current path does not require user to be logged in
    if (auth !== null) {
      console.log("redirecting to main page...");
      return <Navigate to={props.redirectPath} replace={true} />;
    }
  }

  // if given children, render those, otherwise render Layout component
  return props.children ? props.children : <Outlet />;
};

AuthRoute.propTypes = {
  children: PropTypes.node,
  redirectPath: PropTypes.string.isRequired,
  requireLogin: PropTypes.bool,
};

export default AuthRoute;
