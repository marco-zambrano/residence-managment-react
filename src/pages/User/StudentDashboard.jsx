import { useState } from "react";
import { SlidersHorizontal, LogOut } from "lucide-react";
import RoomCard from "./components/RoomCard";
import ReservationModal from "./components/ReservationModal";
import { useData } from "@/context/DataContext";

export default function StudentDashboard({ onLogout }) {
  const { rooms, setRooms, reservations, setReservations, students, setStudents } = useData();
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
      id: reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1,
      estudiante: "Nuevo Estudiante", // This should come from logged in user data
      habitacion: selectedRoom.numero,
      fechaSolicitud: new Date().toLocaleDateString("es-ES"),
      duracion: reservationData.duracion,
      estado: "pendiente",
      comentarios: reservationData.comentarios,
      fechaIngreso: reservationData.fechaIngreso,
    };

    setReservations((prev) => [...prev, newReservation]);

    // Optionally, update room status to 'pendiente' or similar if a reservation is made
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === selectedRoom.id ? { ...room, estado: "pendiente" } : room
      )
    );

    // Add a new student if they don't exist
    const studentExists = students.some(s => s.nombre === newReservation.estudiante);
    if (!studentExists) {
      const newStudent = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        nombre: newReservation.estudiante,
        email: "", // Placeholder
        habitacion: "",
        fechaIngreso: "",
        estado: "pendiente",
      };
      setStudents((prev) => [...prev, newStudent]);
    }

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
            <div className="relative">
              <select
                value={filterEdificio}
                onChange={(e) => setFilterEdificio(e.target.value)}
                className="block appearance-none w-full bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="">Todos los Edificios</option>
                <option value="Edificio A">Edificio A</option>
                <option value="Edificio B">Edificio B</option>
                <option value="Edificio C">Edificio C</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={filterPiso}
                onChange={(e) => setFilterPiso(e.target.value)}
                className="block appearance-none w-full bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="">Todos los Pisos</option>
                <option value="Piso 1">Piso 1</option>
                <option value="Piso 2">Piso 2</option>
                <option value="Piso 3">Piso 3</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="block appearance-none w-full bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="">Todos los Estados</option>
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
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
      />
    </div>
  );
}
