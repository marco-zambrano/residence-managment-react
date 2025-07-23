
export default function RoomCard({ room, onReserve }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-slate-800">Habitación {room.numero}</h3>
        <p className="text-slate-600">Edificio: {room.edificio} - Piso: {room.piso}</p>
        <p className="text-slate-800 font-bold text-lg">€{room.precio} / mes</p>
        <p className="text-slate-700 text-sm">{room.detalles}</p>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              room.estado === "disponible"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {room.estado.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
        <button
          onClick={() => onReserve(room)}
          disabled={room.estado === "ocupada"}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
            room.estado === "disponible"
              ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-400 cursor-not-allowed"
          }`}
        >
          {room.estado === "disponible" ? "Reservar" : "Ocupada"}
        </button>
      </div>
    </div>
  );
}
