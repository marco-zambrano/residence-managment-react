"use client";

import { useState } from "react";
import { Check, X, Eye } from "lucide-react";
import DataTable from "@/components/DataTable";

export default function ReservasSection() {
	const [reservas, setReservas] = useState([
    {
      id: 1,
      estudiante: "María García",
      habitacion: "102",
      fechaSolicitud: "19/1/2024",
      duracion: "2 semestres",
      estado: "pendiente",
    },
    {
      id: 2,
      estudiante: "Pedro Martín",
      habitacion: "202",
      fechaSolicitud: "17/1/2024",
      duracion: "1 semestre",
      estado: "confirmada",
    },
    {
      id: 3,
      estudiante: "Laura Sánchez",
      habitacion: "301",
      fechaSolicitud: "21/1/2024",
      duracion: "1 semestre",
      estado: "pendiente",
    },
  ]);

	const columns = [
		{ header: "Estudiante", accessor: "estudiante" },
		{ header: "Habitacion", accessor: "habitacion" },
		{ header: "Fecha Solicitud", accessor: "fechaSolicitud" },
		{ header: "Duracion", accessor: "duracion" },
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
			color: "blue",
			onClick: (data) => handleAceptarReserva(data)
		},
		{
			icon: <X className="w-4 h-4" />,
			color: "red",
			onClick: (data) => handleRechazarReserva(data)
		},
		{
			icon: <Eye className="w-4 h-4 hidden" />,
			color: "red",
		},
	]

  const [filtro, setFiltro] = useState("todas");

  const reservasFiltradas = reservas.filter((reserva) => {
    if (filtro === "todas") return true;
    if (filtro === "pendientes") return reserva.estado === "pendiente";
    if (filtro === "confirmadas") return reserva.estado === "confirmada";
    return true;
  });

  const handleAceptarReserva = (id) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: "confirmada" } : r))
    );
  };

  const handleRechazarReserva = (id) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: "rechazada" } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">
          Gestión de Reservas
        </h2>
        <div className="flex space-x-2">
          <button
            variant={filtro === "todas" ? "default" : "outline"}
            onClick={() => setFiltro("todas")}
            className={
              filtro === "todas" ? "bg-slate-800 hover:bg-slate-700" : ""
            }
          >
            Todas
          </button>
          <button
            variant={filtro === "pendientes" ? "default" : "outline"}
            onClick={() => setFiltro("pendientes")}
            className={
              filtro === "pendientes" ? "bg-slate-800 hover:bg-slate-700" : ""
            }
          >
            Pendientes
          </button>
          <button
            variant={filtro === "confirmadas" ? "default" : "outline"}
            onClick={() => setFiltro("confirmadas")}
            className={
              filtro === "confirmadas" ? "bg-slate-800 hover:bg-slate-700" : ""
            }
          >
            Confirmadas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
				<DataTable 
					data={reservas} 
					columns={columns} 
					actions={actions}
				/>
      </div>
    </div>
  );
}
