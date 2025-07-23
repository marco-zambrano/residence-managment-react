import { useState } from "react";
import { SlidersHorizontal, LogOut } from "lucide-react";
import RoomCard from "./components/RoomCard";
import ReservationModal from "./components/ReservationModal";

// Datos de ejemplo para las habitaciones
const initialRooms = [
  {
    id: 1,
    numero: "101",
    edificio: "Edificio A",
    piso: "Piso 1",
    precio: 350,
    estado: "ocupada",
    detalles: "Amoblada, con baño privado.",
  },
  {
    id: 2,
    numero: "102",
    edificio: "Edificio A",
    piso: "Piso 1",
    precio: 280,
    estado: "disponible",
    detalles: "Amoblada, baño compartido.",
  },
  {
    id: 3,
    numero: "201",
    edificio: "Edificio B",
    piso: "Piso 2",
    precio: 400,
    estado: "disponible",
    detalles: "Amoblada, con balcón y baño privado.",
  },
  {
    id: 4,
    numero: "202",
    edificio: "Edificio B",
    piso: "Piso 2",
    precio: 320,
    estado: "ocupada",
    detalles: "Amoblada, con vistas al jardín.",
  },
  {
    id: 5,
    numero: "301",
    edificio: "Edificio C",
    piso: "Piso 3",
    precio: 450,
    estado: "disponible",
    detalles: "Estudio completo con cocina pequeña.",
  },
];

export default function StudentDashboard({ onLogout }) {
  const [rooms] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const availableRoomsCount = rooms.filter(
    (r) => r.estado === "disponible"
  ).length;

  const handleReserveClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleConfirmReservation = (reservationData) => {
    console.log("Reserva confirmada:", {
      ...reservationData,
      habitacionId: selectedRoom.id,
    });
    // Aquí iría la lógica para enviar la reserva al backend
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Residencia Estudiantil
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">
            ¡Bienvenido, Estudiante!
          </h2>
          <p className="text-slate-600 mt-1">
            Encuentra y reserva tu habitación ideal.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
              <SlidersHorizontal className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700">Filtros</span>
            </button>
          </div>
          <p className="text-lg font-medium text-slate-700">
            <span className="font-bold text-green-600">
              {availableRoomsCount}
            </span>{" "}
            habitaciones disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onReserve={handleReserveClick}
            />
          ))}
        </div>
      </main>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmReservation}
        room={selectedRoom}
      />
    </div>
  );
}
