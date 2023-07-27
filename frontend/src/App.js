import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import LoginContext from "./Components/Context/login-context";
import RestaurantContext from "./Components/Context/restaurant-context";
import "./App.css";
import Home from "./Components/Home";
import AuthRoute from "./Components/Routing/AuthRoute";
import MenuAuthRoute from "./Components/Routing/MenuAuthRoute";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Menu from "./Components/Restaurant/Menu";
import RestaurantCheckIn from "./Components/Restaurant/RestaurantCheckIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [role, setRole] = useState(null);

  return (
    // TODO: combine contexts and auth routes
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <RestaurantContext.Provider
        value={{
          isCheckedIn,
          setIsCheckedIn,
          role,
          setRole,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/">
              {/* Routes for customer and staff accounts here */}
              <Route index element={<Landing />} />
              <Route element={<AuthRoute redirectPath="/home" />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route
                element={
                  <AuthRoute redirectPath="/login" requireLogin={true} />
                }
              >
                <Route path="home" element={<Home />} />
              </Route>
              {/* Routes for restaurant menu and ordering here */}
              <Route
                element={<MenuAuthRoute redirectPath="/restaurant/menu" />}
              >
                <Route path="restaurant" element={<RestaurantCheckIn />} />
              </Route>
              <Route
                element={
                  <MenuAuthRoute
                    redirectPath="/restaurant"
                    requireCheckIn={true}
                  />
                }
              >
                <Route path="restaurant/menu" element={<Menu />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RestaurantContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
