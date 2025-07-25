import { Building, Users, CheckCircle, Circle } from "lucide-react";
import { useData } from "@/context/DataContext";

export default function DashboardMain() {
    const { rooms, students } = useData();

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.estado === 'ocupada').length;
    const availableRooms = rooms.filter(r => r.estado === 'disponible').length;
    const totalStudents = students.length;

    const stats = [
        {
            title: "Total Habitaciones",
            value: totalRooms,
            icon: Building,
            color: "bg-slate-800",
        },
        {
            title: "Habitaciones Ocupadas",
            value: occupiedRooms,
            icon: Circle,
            color: "bg-orange-500",
        },
        {
            title: "Habitaciones Disponibles",
            value: availableRooms,
            icon: CheckCircle,
            color: "bg-green-500",
        },
        {
            title: "Estudiantes Registrados",
            value: totalStudents,
            icon: Users,
            color: "bg-blue-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <article key={index} className="bg-white shadow-sm rounded-md flex items-center space-x-4 p-6 min-h-36">
                        <div
                            className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                        >
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800">
                                {stat.value}
                            </p>
                            <p className="text-sm text-slate-600">{stat.title}</p>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
