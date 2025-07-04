// context/AuthContext.jsx

// use local storage to persist user data
// each user have only one field that is username

import { createContext , useState, useEffect} from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (username) => {
        const newUser = { username };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
