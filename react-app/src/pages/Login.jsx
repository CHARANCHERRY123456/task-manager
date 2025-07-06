import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../context/useAuth.js";
import LoginForm from "../components/auth/LoginForm.jsx";

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
      <LoginForm />
  );
}

export default Login;