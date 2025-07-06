// context/AuthContext.jsx

import { createContext , useState, useEffect} from "react";
import { authService } from "../service/auth-service.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
        setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (username) => {
        const newUser = authService.login(username);
        setUser(newUser);
    }

    const logout = () => {
        authService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;