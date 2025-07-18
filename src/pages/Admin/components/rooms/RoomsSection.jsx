"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import DataTable from "@/components/DataTable";

// import HabitacionModal from "./habitacion-modal"
// import DeleteConfirmDialog from "./delete-confirm-dialog"

export default function HabitacionesSection() {
    const [habitaciones, setHabitaciones] = useState([
        {
            id: 1,
            numero: "101",
            edificio: "Edificio A",
            piso: "Piso 1",
            estado: "ocupada",
            precio: 350,
            estudiante: "Juan Pérez",
        },
        {
            id: 2,
            numero: "102",
            edificio: "Edificio A",
            piso: "Piso 1",
            estado: "disponible",
            precio: 280,
        },
        {
            id: 3,
            numero: "103",
            edificio: "Edificio B",
            piso: "Piso 1",
            estado: "disponible",
            precio: 350,
        },
        {
            id: 4,
            numero: "201",
            edificio: "Edificio B",
            piso: "Piso 2",
            estado: "ocupada",
            precio: 220,
            estudiante: "Ana López",
        },
        {
            id: 5,
            numero: "202",
            edificio: "Edificio A",
            piso: "Piso 2",
            estado: "disponible",
            precio: 280,
        },
    ])

    const columns = [
        { header: "Numero", accessor: "numero" },
        { header: "Edificio", accessor: "edificio" },
        { header: "Piso", accessor: "piso" },
        {
            header: "Estado",
            accessor: "estado",
            cell: (item) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.estado === "disponible"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {item.estado.toUpperCase()}
                </span>
            ),
        },
        { header: "Precio", accessor: "precio" },
        { header: "Estudiante", accessor: "estudiante" },
    ];

    const actions = [
        {
            icon: <Edit className="w-4 h-4" />,
            color: "blue",
            onClick: (data) => handleEditHabitacion(data)
        },
        {
            icon: <Trash2 className="w-4 h-4" />,
            color: "red",
            onClick: (data) => handleDeleteHabitacion(data)
        }
    ]

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingHabitacion, setEditingHabitacion] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        habitacion: null,
    })

    const handleAddHabitacion = () => {
        setEditingHabitacion(null)
        setIsModalOpen(true)
    }

    const handleEditHabitacion = (habitacion) => {
        setEditingHabitacion(habitacion)
        setIsModalOpen(true)
    }

    const handleDeleteHabitacion = (habitacion) => {
        setDeleteConfirm({ isOpen: true, habitacion })
    }

    const confirmDelete = () => {
        if (deleteConfirm.habitacion) {
            setHabitaciones((prev) => prev.filter((h) => h.id !== deleteConfirm.habitacion.id))
            setDeleteConfirm({ isOpen: false, habitacion: null })
        }
    }

    const handleSaveHabitacion = (habitacionData) => {
        if (editingHabitacion) {
            setHabitaciones((prev) =>
                prev.map((h) => (h.id === editingHabitacion.id ? { ...habitacionData, id: editingHabitacion.id } : h)),
            )
        } else {
            const newId = Math.max(...habitaciones.map((h) => h.id)) + 1
            setHabitaciones((prev) => [...prev, { ...habitacionData, id: newId }])
        }
        setIsModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">Gestión de Habitaciones</h2>
                <button onClick={handleAddHabitacion} className="bg-slate-800 hover:bg-slate-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Habitación
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <DataTable
                    data={habitaciones}
                    columns={columns}
                    actions={actions}
                />
            </div>

            {/* <HabitacionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveHabitacion}
                habitacion={editingHabitacion}
            />

            <DeleteConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, habitacion: null })}
                onConfirm={confirmDelete}
                title="Eliminar Habitación"
                message={`¿Estás seguro de que quieres eliminar la habitación ${deleteConfirm.habitacion?.numero}?`}
            /> */}
        </div>
    )
}
