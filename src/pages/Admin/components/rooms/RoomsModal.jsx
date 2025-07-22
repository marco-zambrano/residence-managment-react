import { X } from "lucide-react";

// Subcomponente para campos de entrada reutilizables
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

// Subcomponente para campos de selección reutilizables
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

export default function RoomsModal({
  isOpen,
  onClose,
  onSave,
  formData,
  onFieldChange,
  isEditing,
}) {
  // No renderizar nada si el modal no está abierto
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const handleInputChange = (e) => {
    onFieldChange(e.target.name, e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up">
        <header className="flex justify-between items-center pb-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            {isEditing ? "Editar Habitación" : "Nueva Habitación"}
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
            label="Número de Habitación:"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            placeholder="Ej: 101"
            required
          />

          <SelectField
            label="Edificio:"
            id="edificio"
            name="edificio"
            value={formData.edificio}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Seleccionar edificio
            </option>
            <option value="Edificio A">Edificio A</option>
            <option value="Edificio B">Edificio B</option>
            <option value="Edificio C">Edificio C</option>
          </SelectField>

          <SelectField
            label="Piso:"
            id="piso"
            name="piso"
            value={formData.piso}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Seleccionar piso
            </option>
            <option value="Piso 1">Piso 1</option>
            <option value="Piso 2">Piso 2</option>
            <option value="Piso 3">Piso 3</option>
          </SelectField>

          <InputField
            label="Precio por mes (€):"
            id="precio"
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleInputChange}
            placeholder="Ej: 300"
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
            <option value="disponible">Disponible</option>
            {isEditing && <option value="ocupada">Ocupada</option>}
          </SelectField>

          {formData.estado === "ocupada" && (
            <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <label className="text-sm font-medium text-slate-700">
                Estudiante Asignado
              </label>
              <div className="flex items-center justify-between">
                <p className="text-slate-900 font-semibold">
                  {formData.estudiante || "No asignado"}
                </p>
                {formData.estudiante && (
                  <button
                    type="button"
                    onClick={() => {
                      onFieldChange("estudiante", "");
                      onFieldChange("estado", "disponible");
                    }}
                    className="text-sm text-red-600 hover:text-red-800 font-semibold transition-colors"
                  >
                    Quitar Estudiante
                  </button>
                )}
              </div>
            </div>
          )}

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
              Guardar Habitación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}