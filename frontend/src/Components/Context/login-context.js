import React from 'react';

// login for user personal user accounts
const LoginContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { }
});

export default LoginContext;
