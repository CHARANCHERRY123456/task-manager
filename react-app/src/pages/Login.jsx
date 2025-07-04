import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate authentication check
    const isAuthenticated = false; // Change this to true to simulate an authenticated user

    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
      <h1>Login Page</h1>
  );
}

export default Login;