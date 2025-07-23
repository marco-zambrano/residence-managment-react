import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import DataTable from "@/components/DataTable";
import StudentsModal from "@pages/Admin/components/students/StudentsModal";
import ConfirmDialog from "@components/ConfirmDialog";
import { useData } from "@/context/DataContext";

// Estado inicial para el formulario del modal
const initialFormData = {
  nombre: "",
  email: "",
  habitacion: "",
  fechaIngreso: "",
  estado: "activo",
};

export default function StudentsSection() {
  const { students, setStudents, rooms, setRooms } = useData();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEstudiante, setEditingEstudiante] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [confirmState, setConfirmState] = useState({ isOpen: false });

  // Update available rooms whenever global rooms state changes
  useEffect(() => {
    setAvailableRooms(rooms.filter((room) => room.estado === "disponible"));
  }, [rooms]);

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

  const handleFormFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEstudiante = () => {
    setEditingEstudiante(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const handleEditEstudiante = (estudiante) => {
    setEditingEstudiante(estudiante);
    setFormData(estudiante);
    setIsModalOpen(true);
  };

  const handleDeleteEstudiante = (estudiante) => {
    setConfirmState({
      isOpen: true,
      title: "Confirmar Eliminación",
      message: `¿Estás seguro de que quieres eliminar al estudiante ${estudiante.nombre}?`,
      onConfirm: () => {
        setStudents((prev) => prev.filter((e) => e.id !== estudiante.id));
        // If the student was assigned to a room, make that room available again
        if (estudiante.habitacion) {
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.numero === estudiante.habitacion
                ? { ...room, estado: "disponible", estudianteAsignado: "" }
                : room
            )
          );
        }
        setConfirmState({ isOpen: false });
      },
      confirmColor: "bg-red-600 hover:bg-red-700",
      confirmText: "Eliminar",
    });
  };

  const handleSaveEstudiante = () => {
    if (editingEstudiante) {
      setStudents((prev) =>
        prev.map((e) =>
          e.id === editingEstudiante.id ? { ...formData, id: editingEstudiante.id } : e
        )
      );
      // If room changed or assigned, update room status
      const oldRoom = rooms.find(r => r.numero === editingEstudiante.habitacion);
      const newRoom = rooms.find(r => r.numero === formData.habitacion);

      if (oldRoom && oldRoom.numero !== formData.habitacion) {
        setRooms(prevRooms => prevRooms.map(room => 
          room.numero === oldRoom.numero ? { ...room, estado: "disponible", estudianteAsignado: "" } : room
        ));
      }
      if (newRoom && newRoom.numero === formData.habitacion) {
        setRooms(prevRooms => prevRooms.map(room => 
          room.numero === newRoom.numero ? { ...room, estado: "ocupada", estudianteAsignado: formData.nombre } : room
        ));
      }

    } else {
      const newId =
        students.length > 0
          ? Math.max(...students.map((e) => e.id)) + 1
          : 1;
      setStudents((prev) => [...prev, { ...formData, id: newId }]);
      // If a room is assigned to a new student, update room status
      if (formData.habitacion) {
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.numero === formData.habitacion
              ? { ...room, estado: "ocupada", estudianteAsignado: formData.nombre }
              : room
          )
        );
      }
    }
    setIsModalOpen(false);
  };

  const actions = [
    {
      icon: <Edit className="w-4 h-4" />,
      color: "blue",
      onClick: (data) => handleEditEstudiante(data),
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      color: "red",
      onClick: (data) => handleDeleteEstudiante(data),
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Gestión de Estudiantes
        </h2>
        <button
          onClick={handleAddEstudiante}
          className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Estudiante</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable data={students} columns={columns} actions={actions} />
      </div>

      <StudentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEstudiante}
        formData={formData}
        onFieldChange={handleFormFieldChange}
        isEditing={!!editingEstudiante}
        availableRooms={availableRooms}
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