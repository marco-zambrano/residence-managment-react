import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import DataTable from "@/components/DataTable";
import RoomsModal from "@/pages/Admin/components/rooms/RoomsModal";
import ConfirmDialog from "@components/ConfirmDialog";

// Datos iniciales de ejemplo
const initialRooms = [
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
    estudiante: "",
  },
];

// Estado inicial para el formulario del modal
const initialFormData = {
  numero: "",
  edificio: "",
  piso: "",
  estado: "disponible",
  precio: "",
  estudiante: "", // Aunque no se edita en el modal, es parte del objeto
};

export default function RoomsSection() {
  const [habitaciones, setHabitaciones] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabitacion, setEditingHabitacion] = useState(null); // null para crear, objeto para editar
  const [formData, setFormData] = useState(initialFormData);
  const [confirmState, setConfirmState] = useState({ isOpen: false });

  // Definición de las columnas para la DataTable
  const columns = [
    { header: "Número", accessor: "numero" },
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
    { header: "Precio ($)", accessor: "precio" },
    { header: "Estudiante", accessor: "estudiante" },
  ];

  // Maneja los cambios en los campos del formulario
  const handleFormFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Abre el modal para crear una nueva habitación
  const handleAddHabitacion = () => {
    setEditingHabitacion(null);
    setFormData(initialFormData); // Resetea el formulario
    setIsModalOpen(true);
  };

  // Abre el modal para editar una habitación existente
  const handleEditHabitacion = (habitacion) => {
    setEditingHabitacion(habitacion);
    setFormData({ ...habitacion, precio: habitacion.precio.toString() }); // Carga datos existentes
    setIsModalOpen(true);
  };

  // Elimina una habitación con confirmación
  const handleDeleteHabitacion = (habitacion) => {
    setConfirmState({
      isOpen: true,
      title: "Confirmar Eliminación",
      message: `¿Estás seguro de que quieres eliminar la habitación ${habitacion.numero}?`,
      onConfirm: () => {
        setHabitaciones((prev) => prev.filter((h) => h.id !== habitacion.id));
        setConfirmState({ isOpen: false });
      },
      confirmColor: "bg-red-600 hover:bg-red-700",
      confirmText: "Eliminar",
    });
  };

  // Guarda los cambios (crear o editar)
  const handleSaveHabitacion = () => {
    const habitacionData = {
      ...formData,
      precio: Number.parseFloat(formData.precio),
    };

    if (editingHabitacion) {
      // Actualizar habitación existente
      setHabitaciones((prev) =>
        prev.map((h) =>
          h.id === editingHabitacion.id
            ? { ...habitacionData, id: editingHabitacion.id }
            : h
        )
      );
    } else {
      // Crear nueva habitación
      const newId =
        habitaciones.length > 0 ? Math.max(...habitaciones.map((h) => h.id)) + 1 : 1;
      setHabitaciones((prev) => [...prev, { ...habitacionData, id: newId }]);
    }

    setIsModalOpen(false); // Cierra el modal
  };

  // Acciones para cada fila de la tabla
  const actions = [
    {
      icon: <Edit className="w-4 h-4" />,
      color: "blue",
      onClick: (data) => handleEditHabitacion(data),
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      color: "red",
      onClick: (data) => handleDeleteHabitacion(data),
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Gestión de Habitaciones
        </h2>
        <button
          onClick={handleAddHabitacion}
          className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Habitación</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable data={habitaciones} columns={columns} actions={actions} />
      </div>

      <RoomsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveHabitacion}
        formData={formData}
        onFieldChange={handleFormFieldChange}
        isEditing={!!editingHabitacion} // Convierte el objeto a booleano
      />
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState({ isOpen: false })}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        confirmColor={confirmState.confirmColor}
      />
    </div>
  );
}