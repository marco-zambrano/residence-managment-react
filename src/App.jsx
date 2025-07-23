import { useState } from "react";
import LoginPage from "@pages/Auth/LoginPage";
import AdminDashboard from "@pages/Admin/AdminDashboard";
import StudentDashboard from "@pages/User/StudentDashboard";
import { DataProvider } from "@/context/DataContext";

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

    return (
        <DataProvider>
            {userType === "admin" && <AdminDashboard onLogout={handleLogout} />}
            {userType === "student" && <StudentDashboard onLogout={handleLogout} />}
        </DataProvider>
    );
}
