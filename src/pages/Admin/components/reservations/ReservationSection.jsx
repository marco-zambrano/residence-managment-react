import { useState } from "react";
import { Check, X } from "lucide-react";
import DataTable from "@/components/DataTable";
import ConfirmDialog from "@components/ConfirmDialog";
import { useData } from "@/context/DataContext";

export default function ReservationSection() {
  const { reservations, acceptReservation } = useData();
  const [filtro, setFiltro] = useState("todas");
  const [confirmState, setConfirmState] = useState({ isOpen: false });

  const handleAccept = (reserva) => {
    setConfirmState({
      isOpen: true,
      title: "Confirmar Aceptación",
      message: `¿Estás seguro de que quieres aceptar la reserva de ${reserva.estudiante}?`,
      onConfirm: () => {
        acceptReservation(reserva.id);
        setConfirmState({ isOpen: false });
      },
      confirmColor: "bg-green-600 hover:bg-green-700",
      confirmText: "Aceptar",
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
      onClick: (data) => handleAccept(data),
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