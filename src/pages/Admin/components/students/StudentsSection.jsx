import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import DataTable from "@/components/DataTable";
import StudentsModal from "./StudentsModal";

// Datos iniciales de ejemplo para estudiantes
const initialStudents = [
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
    habitacion: "",
    fechaIngreso: "2024-08-20",
    estado: "pendiente",
  },
];

// Datos de ejemplo para habitaciones (simulando una carga de datos)
const allRooms = [
  { id: 1, numero: "101", edificio: "Edificio A", estado: "ocupada" },
  { id: 2, numero: "102", edificio: "Edificio A", estado: "disponible" },
  { id: 3, numero: "201", edificio: "Edificio B", estado: "ocupada" },
  { id: 4, numero: "202", edificio: "Edificio B", estado: "disponible" },
];

// Estado inicial para el formulario del modal
const initialFormData = {
  nombre: "",
  email: "",
  habitacion: "",
  fechaIngreso: "",
  estado: "activo",
};

export default function StudentsSection() {
  const [estudiantes, setEstudiantes] = useState(initialStudents);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEstudiante, setEditingEstudiante] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Simula la carga de habitaciones disponibles
  useEffect(() => {
    // En una aplicación real, esto sería una llamada a una API
    setAvailableRooms(allRooms.filter((room) => room.estado === "disponible"));
  }, []);

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
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar al estudiante ${estudiante.nombre}?`
      )
    ) {
      setEstudiantes((prev) => prev.filter((e) => e.id !== estudiante.id));
    }
  };

  const handleSaveEstudiante = () => {
    if (editingEstudiante) {
      setEstudiantes((prev) =>
        prev.map((e) =>
          e.id === editingEstudiante.id ? { ...formData, id: editingEstudiante.id } : e
        )
      );
    } else {
      const newId =
        estudiantes.length > 0
          ? Math.max(...estudiantes.map((e) => e.id)) + 1
          : 1;
      setEstudiantes((prev) => [...prev, { ...formData, id: newId }]);
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
        <DataTable data={estudiantes} columns={columns} actions={actions} />
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
    </div>
  );
}