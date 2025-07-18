import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import DataTable from "@/components/DataTable"; // Corregido el case de DataTable
// import StudentsModal from "./StudentsModal";
// import DeleteConfirmDialog from "../DeleteConfirmDialog";

export default function StudentsSection() {
    const [estudiantes, setEstudiantes] = useState([
        {
            id: 1,
            nombre: "Juan Pérez",
            email: "juan.perez@universidad.edu",
            habitacion: "101",
            fechaIngreso: "2024-01-15",
            estado: "activo",
        },
        {
            id: 2,
            nombre: "Ana López",
            email: "ana.lopez@universidad.edu",
            habitacion: "201",
            fechaIngreso: "2024-02-01",
            estado: "activo",
        },
        {
            id: 3,
            nombre: "Carlos Ruiz",
            email: "carlos.ruiz@universidad.edu",
            estado: "pendiente",
        },
        ]);

    const columns = [
        { header: "Nombre", accessor: "nombre" },
        { header: "Email", accessor: "email" },
        { header: "Habitación", accessor: "habitacion" },
        { header: "Fecha Ingreso", accessor: "fechaIngreso" },
        {
            header: "Estado",
            accessor: "estado",
            cell: (item) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.estado === "activo"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {item.estado.toUpperCase()}
                </span>
            ),
        },
    ];

    const actions = [
        {
            icon: <Edit className="w-4 h-4" />,
            color: "blue",
            onClick: (data) => handleEditEstudiante(data)
        },
        {
            icon: <Trash2 className="w-4 h-4" />,
            color: "red",
            onClick: (data) => handleDeleteEstudiante(data)
        }
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEstudiante, setEditingEstudiante] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        estudiante: null,
    });

    const handleAddEstudiante = () => {
        setEditingEstudiante(null);
        setIsModalOpen(true);
    };

    const handleEditEstudiante = (estudiante) => {
        setEditingEstudiante(estudiante);
        setIsModalOpen(true);
    };

    const handleDeleteEstudiante = (estudiante) => {
        setDeleteConfirm({ isOpen: true, estudiante });
    };

    const confirmDelete = () => {
        if (deleteConfirm.estudiante) {
            setEstudiantes((prev) =>
                prev.filter((e) => e.id !== deleteConfirm.estudiante.id)
            );
            setDeleteConfirm({ isOpen: false, estudiante: null });
        }
    };

    const handleSaveEstudiante = (estudianteData) => {
        if (editingEstudiante) {
            setEstudiantes((prev) =>
                prev.map((e) =>
                    e.id === editingEstudiante.id ? { ...estudianteData, id: editingEstudiante.id } : e
                )
            );
        } else {
            const newId = Math.max(...estudiantes.map((e) => e.id)) + 1;
            setEstudiantes((prev) => [...prev, { ...estudianteData, id: newId }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">
                    Gestión de Estudiantes
                </h2>
                <button
                    onClick={handleAddEstudiante}
                    className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Estudiante
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <DataTable 
                    data={estudiantes} 
                    columns={columns} 
                    actions={actions}
                />
            </div>

            {/* <EstudianteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEstudiante}
                estudiante={editingEstudiante}
            />

            <DeleteConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, estudiante: null })}
                onConfirm={confirmDelete}
                title="Eliminar Estudiante"
                message={`¿Estás seguro de que quieres eliminar al estudiante ${deleteConfirm.estudiante?.nombre}?`}
            /> */}
        </div>
    );
}
