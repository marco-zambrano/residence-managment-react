export default function DataTable({ data, columns, actions }) {
    return (
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-800 text-white">
                <tr>
                    {columns.map((column) => (
                        <th key={column.accessor} scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                            {column.header}
                        </th>
                    ))}
                    {actions && <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Acciones</th>}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={`${item.id}-${column.accessor}`} className="px-6 py-4 whitespace-nowrap text-center">
                                {column.cell
                                    ? column.cell(item)
                                    : (item[column.accessor] !== undefined && item[column.accessor] !== null && item[column.accessor] !== '' ? item[column.accessor] : "-")}
                            </td>
                        ))}
                        {actions && (
                            <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-4">
                                {actions
                                    .filter(action => action.shouldShow ? action.shouldShow(item) : true)
                                    .map((action, index) => (
                                    <button
                                        key={index}
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => action.onClick(item)}
                                        className={`text-${action.color}-600 hover:text-${action.color}-700`}
                                    >
                                        {action.icon}
                                    </button>
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}