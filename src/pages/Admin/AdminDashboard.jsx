import { useState } from "react";
import {
    LayoutDashboard,
    Building,
    Users,
    Calendar,
    LogOut,
} from "lucide-react";
import DashboardMain from "@pages/Admin/components/main/DashboardMain";
import StudentsSection from "@pages/Admin/components/students/StudentsSection";
// import EstudiantesSection from "./estudiantes-section";
// import ReservasSection from "./reservas-section";

export default function AdminDashboard({ onLogout }) {
    const [activeSection, setActiveSection] = useState("dashboard");

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "habitaciones", label: "Habitaciones", icon: Building },
        { id: "estudiantes", label: "Estudiantes", icon: Users },
        { id: "reservas", label: "Reservas", icon: Calendar },
    ];

    const renderContent = () => {
        switch (activeSection) {
        case "dashboard":
            return <DashboardMain />;
        // case "habitaciones":
        //     return <HabitacionesSection />;
        case "estudiantes":
            return <StudentsSection />;
        // case "reservas":
        //     return <ReservasSection />;
        default:
            return <DashboardMain />;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg relative">
                <div className="p-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                            <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800">Admin Panel</h2>
                        </div>
                    </div>
                </div>

                <nav className="px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                activeSection === item.id
                                    ? "bg-slate-100 text-slate-800 font-medium"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4">
                    <button
                        onClick={onLogout}
                        variant="outline"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {menuItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
                    </h1>
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-slate-600">
                            Administrador: María González
                        </span>
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">MG</span>
                        </div>
                    </div>
                </header>

                <main className="p-8">{renderContent()}</main>
            </div>
        </div>
    );
}
