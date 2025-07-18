"use client";

import { useState } from "react";
// import { button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
// import EstudianteModal from "./estudiante-modal";
// import DeleteConfirmDialog from "./delete-confirm-dialog";

export default function EstudiantesSection() {
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
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">NOMBRE</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">EMAIL</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">HABITACIÓN</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">FECHA INGRESO</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">ESTADO</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {estudiantes.map((estudiante) => (
                            <tr key={estudiante.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{estudiante.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-slate-600">{estudiante.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{estudiante.habitacion || "-"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{estudiante.fechaIngreso || "-"}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            estudiante.estado === "activo"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {estudiante.estado.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-4">
                                    <button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleEditEstudiante(estudiante)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDeleteEstudiante(estudiante)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
