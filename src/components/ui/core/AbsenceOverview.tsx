"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

import EmployeesTable from "@/components/ui/core/EmployeesTable";
import { COLUMN_HEADER_LIST } from "@/lib/api/defaultData";
import transformCell from "@/lib/helpers/transformCell";
import useAbsence from "@/lib/hooks/useAbsence";
import { AbsenceType } from "@/lib/types/absence";
import { cn, transformMixedCaseToSpaces } from "@/lib/utils";

// Define constants outside component to prevent recreation
const columnHelper = createColumnHelper<AbsenceType>();
const NON_SORTABLE_COLUMNS = ["no", "id", "newSeoTitle", "newSeoDescription"];
const NON_RESIZABLE_COLUMNS = ["no", "id", "lastUpdated"];

export default function AbsenceOverview() {
    const { data, isLoading, isError, error } = useAbsence();

    const columns = useMemo(
        () =>
            COLUMN_HEADER_LIST.map((columnName) => {
                return columnHelper.accessor(columnName, {
                    id: columnName,
                    size: columnName === "id" ? 50 : 220,
                    // minSize: getMinColumnSize(columnName),
                    maxSize: 1200,
                    cell: (info) => transformCell(info),
                    header: () => (
                        <span
                            className={cn("capitalize", {
                                uppercase: columnName === "id",
                            })}
                        >
                            {transformMixedCaseToSpaces(columnName)}
                        </span>
                    ),
                    sortUndefined: "last", //force undefined values to the end
                    enableSorting: !NON_SORTABLE_COLUMNS.includes(columnName), //disable sorting for specific columns
                    enableResizing: !NON_RESIZABLE_COLUMNS.includes(columnName), //disable resizing for specific columns
                });
            }),
        [], // Remove updateData and setUpdateData from dependencies
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <section className="p-4 flex flex-col gap-y-4 *:w-full">
            <div className="container">
                <h1 className="text-2xl font-bold text-sky-500">Absence Overview</h1>

                <EmployeesTable columns={columns} queryData={data} />
            </div>
        </section>
    );
}
