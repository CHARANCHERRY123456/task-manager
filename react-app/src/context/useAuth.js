import { useContext } from "react";

import { AuthProvider } from "./AuthContext.jsx";

export default function useAuth() {
    const context = useContext(AuthProvider);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

