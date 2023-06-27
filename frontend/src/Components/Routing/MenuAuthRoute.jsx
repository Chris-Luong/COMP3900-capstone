import { React } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

// Route wrapper component that checks if user is checked into the restaurant
// this is needed to track menu ordering
const MenuAuthRoute = (props) => {
  const checkedIn = localStorage.getItem("checkedIn");

  if (props.requireCheckIn === true) {
    if (checkedIn === null) {
      console.log("redirecting to check in page...");
      return <Navigate to={props.redirectPath} replace={true} />;
    }
  } else {
    if (checkedIn !== null) {
      console.log("redirecting to menu page...");
      return <Navigate to={props.redirectPath} replace={true} />;
    }
  }

  return props.children ? props.children : <Outlet />;
};

MenuAuthRoute.propTypes = {
  children: PropTypes.node,
  redirectPath: PropTypes.string.isRequired,
  requireLogin: PropTypes.bool,
};

export default MenuAuthRoute;
