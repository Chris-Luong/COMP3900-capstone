import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import LoginContext from "./Components/Context/login-context";
import "./App.css";
import Home from "./Components/Home";
import AuthRoute from "./Components/Routing/AuthRoute";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import StaffLogin from "./Components/StaffLogin";
import Restaurant from "./Components/Restaurant";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route element={<AuthRoute redirectPath="/home" />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="staff-login" element={<StaffLogin />} />
            </Route>
            <Route
              element={<AuthRoute redirectPath="/login" requireLogin={true} />}
            >
              <Route path="home" element={<Home />} />
            </Route>
            <Route path="restaurant" element={<Restaurant />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
