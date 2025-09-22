import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import "./TransactionTable.css";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("date", { header: "Date" }),
    columnHelper.accessor("type", { header: "Type" }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("amount", { header: "Amount ($)" }),
];

export default function TransactionTable({ data }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table className="table">
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
