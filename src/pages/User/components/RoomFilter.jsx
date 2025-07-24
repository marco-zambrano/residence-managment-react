export default function RoomFilter(
  {filterEdificio, 
  setFilterEdificio,
  filterPiso,
  setFilterPiso,
  filterEstado,
  setFilterEstado}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <select
          value={filterEdificio}
          onChange={(e) => setFilterEdificio(e.target.value)}
          className="block appearance-none w-full bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-slate-500 focus:border-slate-500 cursor-pointer"
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
          className="block appearance-none w-full bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-slate-500 focus:border-slate-500 cursor-pointer"
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
          className="block appearance-none w-full bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-slate-500 focus:border-slate-500 cursor-pointer"
        >
          <option value="">Todos los Estados</option>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="pendiente">Pendiente</option>
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
  );
}
