import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useMemo } from "react";

import Paginator from "@/components/ui/core/Paginator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ABSENCE_DATA } from "@/lib/api/defaultData";
import { AbsenceType } from "@/lib/types/absence";
import { cn } from "@/lib/utils";

function getSortIcon(sortState: string | false): ReactNode | null {
    switch (sortState) {
        case "asc":
            return <ArrowUp className="size-4" />;
        case "desc":
            return <ArrowDown className="size-4" />;
        default:
            return <ArrowUpDown className="opacity-50 size-4" />;
    }
}

type EmployeesTableProps = {
    queryData?: AbsenceType[];
    columns: ColumnDef<AbsenceType, any>[];
};

export default function EmployeesTable({ queryData, columns }: EmployeesTableProps) {
    const router = useRouter();
    const fallbackData = useMemo(() => ABSENCE_DATA, []);
    const defaultColumns = useMemo(() => columns, [columns]);

    const table = useReactTable<AbsenceType>({
        data: queryData ?? fallbackData,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel<AbsenceType>(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
    });

    return (
        <div className="rounded-lg p-2 overflow-hidden">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="bg-gray-200">
                                    <div className={cn("inline-flex gap-2 justify-between w-full items-center")}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}

                                        <button
                                            className={cn("w-auto", {
                                                "cursor-pointer select-none": header.column.getCanSort(),
                                                "invisible cursor-default": !header.column.getCanSort(),
                                            })}
                                            onClick={header.column.getToggleSortingHandler()}
                                            title={
                                                header.column.getCanSort()
                                                    ? header.column.getNextSortingOrder() === "asc"
                                                        ? "Sort ascending"
                                                        : header.column.getNextSortingOrder() === "desc"
                                                          ? "Sort descending"
                                                          : "Clear sort"
                                                    : undefined
                                            }
                                            type="button"
                                        >
                                            {getSortIcon(header.column.getIsSorted())}
                                        </button>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            className="cursor-pointer hover:bg-sky-300/25"
                            onClick={() => router.push(`/absences/${row.original.employee.id}`)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="border text-start">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Paginator methods={table} />
        </div>
    );
}
