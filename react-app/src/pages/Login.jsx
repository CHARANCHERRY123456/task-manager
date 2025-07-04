import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../context/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const isAuthenticated = user && user.username;

    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate , user]);

  return (
      <h1>Login Page</h1>
  );
}

export default Login;