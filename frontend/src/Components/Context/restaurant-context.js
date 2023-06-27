import React from "react";

// checks if user has checked into the restaurant
const RestaurantContext = React.createContext({
  isCheckedIn: false,
  setIsCheckedIn: () => {},
  role: null,
  setRole: () => {},
});

export default RestaurantContext;
