import { X } from "lucide-react";

const InputField = ({ label, id, ...props }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={id}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-shadow"
      {...props}
    />
  </div>
);

const SelectField = ({ label, id, value, onChange, children, ...props }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-shadow bg-white"
      {...props}
    >
      {children}
    </select>
  </div>
);

export default function StudentsModal({
  isOpen,
  onClose,
  onSave,
  formData,
  onFieldChange,
  isEditing,
  availableRooms,
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
      onFieldChange(name, filteredValue);
    } else {
      onFieldChange(name, value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up">
        <header className="flex justify-between items-center pb-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            {isEditing ? "Editar Estudiante" : "Nuevo Estudiante"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 transition-colors rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <InputField
            label="Nombre Completo:"
            id="nombre"
            name="nombre"
            maxlength="50"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Juan Pérez"
            required
          />

          <InputField
            label="Correo Electrónico:"
            id="email"
            name="email"
            type="email"
            maxlength="50"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ej: juan.perez@universidad.edu"
            required
          />

          <SelectField
            label="Habitación Asignada:"
            id="habitacion"
            name="habitacion"
            value={formData.habitacion}
            onChange={handleInputChange}
          >
            <option value="">Sin asignar</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.numero}>
                Habitación {room.numero} ({room.edificio})
              </option>
            ))}
          </SelectField>

          <InputField
            label="Fecha de Ingreso:"
            id="fechaIngreso"
            name="fechaIngreso"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.fechaIngreso}
            onChange={handleInputChange}
            required
          />

          <SelectField
            label="Estado:"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            required
          >
            <option value="activo">Activo</option>
            <option value="pendiente">Pendiente</option>
          </SelectField>

          <div className="flex justify-end space-x-3 pt-4 mt-2">
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
              Guardar Estudiante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
