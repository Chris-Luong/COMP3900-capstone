import React from 'react';

const LoginContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { }
});

export default LoginContext;
