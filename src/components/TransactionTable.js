import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import "./TransactionTable.css";

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.accessor("nume_cont_propriu", {
        header: "Nume Cont Propriu",
    }),
    columnHelper.accessor("cont_propriu", {
        header: "IBAN Cont Propriu",
    }),
    columnHelper.accessor("data_inregistrarii", {
        header: "Data Înregistrării",
    }),
    columnHelper.accessor("nume_partener", {
        header: "Nume Partener",
    }),
    columnHelper.accessor("iban_partener", {
        header: "IBAN Partener",
    }),
    columnHelper.accessor("suma", {
        header: "Sumă",
        cell: info => `${info.getValue()} RON`,
    }),
    columnHelper.accessor("moneda", {
        header: "Monedă",
        cell: info => info.getValue().code,
    }),
    columnHelper.accessor("description", {
        header: "Descriere",
    }),
    columnHelper.accessor("tip", {
        header: "Tip",
    }),
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
