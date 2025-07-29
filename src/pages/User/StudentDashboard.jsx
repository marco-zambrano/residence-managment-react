import { useState } from "react";
import { useData } from "@/context/DataContext";

import { LogOut } from "lucide-react";
import RoomCard from "./components/RoomCard";
import ReservationModal from "./components/ReservationModal";
import RoomFilter from "./components/RoomFilter";

export default function StudentDashboard({ currentUser, onLogout }) {
  const { rooms, addReservation } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filterEdificio, setFilterEdificio] = useState("");
  const [filterPiso, setFilterPiso] = useState("");
  const [filterEstado, setFilterEstado] = useState("disponible"); // Default to show available rooms

  const filteredRooms = rooms.filter((room) => {
    if (filterEdificio && room.edificio !== filterEdificio) return false;
    if (filterPiso && room.piso !== filterPiso) return false;
    if (filterEstado && room.estado !== filterEstado) return false;
    return true;
  });

  const availableRoomsCount = filteredRooms.filter(
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
    const newReservation = {
      estudiante: currentUser.nombre,
      habitacion: selectedRoom.numero,
      fechaSolicitud: new Date().toLocaleDateString("es-ES"),
      duracion: reservationData.duracion,
      estado: "pendiente",
      comentarios: reservationData.comentarios,
      fechaIngreso: reservationData.fechaIngreso,
    };

    addReservation(newReservation);
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
            <span className="hidden md:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">
            ¡Bienvenido, {currentUser.nombre}!
          </h2>
          <p className="text-slate-600 mt-1">
            Encuentra y reserva tu habitación ideal.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <RoomFilter
            filterEdificio={filterEdificio}
            setFilterEdificio={setFilterEdificio}
            filterPiso={filterPiso}
            setFilterPiso={setFilterPiso}
            filterEstado={filterEstado}
            setFilterEstado={setFilterEstado}
          />

          <p className="text-lg font-medium text-slate-700">
            <span className="font-bold text-green-600">
              {availableRoomsCount}
            </span>{" "}
            habitaciones disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
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
        currentUser={currentUser}
      />
    </div>
  );
}
