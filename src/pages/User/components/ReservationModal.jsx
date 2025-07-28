
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ReservationModal({
  isOpen,
  onClose,
  onConfirm,
  room,
}) {
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [duracion, setDuracion] = useState("");
  const [comentarios, setComentarios] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFechaIngreso("");
      setDuracion("");
      setComentarios("");
    }
  }, [isOpen]);

  if (!isOpen || !room) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      fechaIngreso,
      duracion,
      comentarios,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up">
        <header className="flex justify-between items-center pb-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            Reservar Habitación {room.numero}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 transition-colors rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-700">Resumen de la Habitación:</h3>
          <p className="text-sm text-slate-600">Edificio: {room.edificio}, Piso: {room.piso}</p>
          <p className="text-sm text-slate-600">Precio: €{room.precio} / mes</p>
          <p className="text-sm text-slate-600">Detalles: {room.detalles}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="fechaIngreso" className="block text-sm font-medium text-slate-700">Fecha de Ingreso:</label>
            <input
              type="date"
              id="fechaIngreso"
              value={fechaIngreso}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFechaIngreso(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label htmlFor="duracion" className="block text-sm font-medium text-slate-700">Duración de Estadia:</label>
            <select
              id="duracion"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 bg-white"
              required
            >
              <option value="">Seleccionar duración</option>
              <option value="1 semestre">1 Semestre</option>
              <option value="2 semestres">2 Semestres</option>
              <option value="3 semestres">3 Semestres</option>
            </select>
          </div>

          <div>
            <label htmlFor="comentarios" className="block text-sm font-medium text-slate-700">Comentarios Adicionales:</label>
            <textarea
              id="comentarios"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-sm"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
