import { Link } from "react-router-dom";
import LoginContext from "./Context/login-context";
import { useContext } from "react";

const Landing = () => {
  const login = useContext(LoginContext);

  return (
    <div>
      Landing page here
      {!login.isLoggedIn && (
        <>
          <p>
            Already have an account? <Link to="../login">Login here</Link>
          </p>
          <p>
            Don't have an account? <Link to="../register">Register here</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Landing;
