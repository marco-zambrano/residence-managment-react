import { useState } from "react";
import { Check, X } from "lucide-react";
import DataTable from "@/components/DataTable";
import ConfirmDialog from "@components/ConfirmDialog";
import { useData } from "@/context/DataContext";

export default function ReservationSection() {
  const { reservations, setReservations, rooms, setRooms, students, setStudents } = useData();
  const [filtro, setFiltro] = useState("todas");
  const [confirmState, setConfirmState] = useState({ isOpen: false });

  const handleUpdateStatus = (reserva, newStatus) => {
    const isAccepting = newStatus === "confirmada";
    const actionText = isAccepting ? "aceptar" : "rechazar";

    setConfirmState({
      isOpen: true,
      title: `Confirmar ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      message: `¿Estás seguro de que quieres ${actionText} la reserva de ${reserva.estudiante}?`,
      onConfirm: () => {
        if (isAccepting) {
          setReservations((prev) =>
            prev.map((r) => (r.id === reserva.id ? { ...r, estado: newStatus } : r))
          );
          // Update room status to 'ocupada'
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.numero === reserva.habitacion
                ? { ...room, estado: "ocupada", estudianteAsignado: reserva.estudiante }
                : room
            )
          );
          // Update student status to 'activo' and assign room
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.nombre === reserva.estudiante
                ? { ...student, estado: "activo", habitacion: reserva.habitacion }
                : student
            )
          );
        } else {
          setReservations((prev) => prev.filter((r) => r.id !== reserva.id));
        }
        setConfirmState({ isOpen: false });
      },
      confirmColor: isAccepting ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700",
      confirmText: actionText.charAt(0).toUpperCase() + actionText.slice(1),
    });
  };

  const columns = [
    { header: "Estudiante", accessor: "estudiante" },
    { header: "Habitación", accessor: "habitacion" },
    { header: "Fecha Solicitud", accessor: "fechaSolicitud" },
    { header: "Duración", accessor: "duracion" },
    {
      header: "Estado",
      accessor: "estado",
      cell: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.estado === "confirmada"
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
      icon: <Check className="w-4 h-4" />,
      color: "green",
      onClick: (data) => handleUpdateStatus(data, "confirmada"),
      shouldShow: (data) => data.estado === "pendiente",
    },
    {
      icon: <X className="w-4 h-4" />,
      color: "red",
      onClick: (data) => handleUpdateStatus(data, "rechazada"),
      shouldShow: (data) => data.estado === "pendiente",
    },
  ];

  const reservasFiltradas = reservations.filter((reserva) => {
    if (filtro === "todas") return true;
    return reserva.estado === filtro;
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Gestión de Reservas
        </h2>
        <div className="flex space-x-2 bg-slate-200 p-1 rounded-lg">
          <button
            onClick={() => setFiltro("todas")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filtro === "todas" ? "bg-white shadow" : "text-slate-600"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro("pendiente")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filtro === "pendiente" ? "bg-white shadow" : "text-slate-600"
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFiltro("confirmada")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filtro === "confirmada" ? "bg-white shadow" : "text-slate-600"
            }`}
          >
            Confirmadas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable data={reservasFiltradas} columns={columns} actions={actions} />
      </div>

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