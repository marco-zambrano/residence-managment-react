import { useState } from "react";
import LoginPage from "./components/login-page";
// import AdminDashboard from "@/components/admin-dashboard";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);

    const handleLogin = (username, password) => {
        // Simulación de autenticación
        if (username === "admin" && password === "admin") {
            setUserType("admin");
            setIsLoggedIn(true);
        } else if (username === "estudiante" && password === "estudiante") {
            setUserType("student");
            setIsLoggedIn(true);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserType(null);
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

//     if (userType === "admin") {
//         return <AdminDashboard onLogout={handleLogout} />;
//     }

//     return <div>Vista de estudiante (próximamente)</div>;
}
