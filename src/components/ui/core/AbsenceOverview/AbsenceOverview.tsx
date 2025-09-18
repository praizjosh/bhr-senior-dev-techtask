"use client";

import { useMemo } from "react";

import EmployeesTable from "@/components/ui/core/EmployeesTable/EmployeesTable";
import LoadingSpinner from "@/components/ui/core/LoadingSpinner";
import { COLUMN_HEADER_LIST } from "@/lib/api/defaultData";
import { columnHelper, NON_RESIZABLE_COLUMNS, NON_SORTABLE_COLUMNS } from "@/lib/constants";
import transformCell from "@/lib/helpers/transformCell";
import useAbsence from "@/lib/hooks/useAbsence";
import { AbsenceType } from "@/lib/types/absence";
import { cn, transformMixedCaseToSpaces } from "@/lib/utils";

export default function AbsenceOverview() {
    const { data, isLoading, isError, error } = useAbsence();

    const columns = useMemo(
        () =>
            COLUMN_HEADER_LIST.map((columnName) => {
                const colNameStr = String(columnName);
                return columnHelper.accessor(colNameStr as keyof AbsenceType, {
                    id: colNameStr,
                    maxSize: 1200,
                    cell: (info) => transformCell(info),
                    header: () => (
                        <span
                            className={cn("capitalize", {
                                uppercase: colNameStr === "id",
                            })}
                        >
                            {transformMixedCaseToSpaces(colNameStr)}
                        </span>
                    ),
                    sortUndefined: "last", //force undefined values to the end
                    enableSorting: !NON_SORTABLE_COLUMNS.includes(colNameStr), //disable sorting for specific columns
                    enableResizing: !NON_RESIZABLE_COLUMNS.includes(colNameStr), //disable resizing for specific columns
                });
            }),
        [],
    );

    if (isLoading) {
        return (
            <section className="p-4 flex flex-col gap-y-4 *:w-full h-screen">
                <div className="container size-full flex items-center justify-center">
                    <LoadingSpinner className="size-24" data-testid="loading-spinner" />
                </div>
            </section>
        );
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <section className="p-4 flex flex-col gap-y-4 *:w-full">
            <div className="container">
                <h1 className="text-2xl mb-4 font-bold text-sky-600">Employee Absence Overview</h1>

                <EmployeesTable columns={columns} queryData={data} />
            </div>
        </section>
    );
}
