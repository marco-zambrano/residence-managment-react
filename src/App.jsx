import { useState } from "react";
import LoginPage from "@pages/Auth/LoginPage";
import AdminDashboard from "@pages/Admin/AdminDashboard";
import StudentDashboard from "@pages/User/StudentDashboard";
import { DataProvider, useData } from "@/context/DataContext";

function AppContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { students } = useData();

    const handleLogin = (username, password) => {
        if (username === "admin" && password === "admin") {
            setUserType("admin");
            setIsLoggedIn(true);
            setCurrentUser({ nombre: 'Admin' });
            return true;
        } else {
            const student = students.find(s => s.nombre === username);
            if (student) {
                setUserType("student");
                setIsLoggedIn(true);
                setCurrentUser(student);
                return true;
            }
        }
        return false;
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserType(null);
        setCurrentUser(null);
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <>
            {userType === "admin" && <AdminDashboard onLogout={handleLogout} />}
            {userType === "student" && <StudentDashboard currentUser={currentUser} onLogout={handleLogout} />}
        </>
    );
}

export default function App() {
    return (
        <DataProvider>
            <AppContent />
        </DataProvider>
    );
}
