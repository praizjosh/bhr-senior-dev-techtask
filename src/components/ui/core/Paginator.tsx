import type { Table } from "@tanstack/react-table";

import { AbsenceType } from "@/lib/types/absence";

type PaginatorProps = {
    methods: Table<AbsenceType>;
};

export default function Paginator({ methods }: PaginatorProps) {
    return (
        <div className="flex items-center gap-2 mt-5">
            <button
                className="border rounded py-1 px-2 hover:text-sky-500 hover:cursor-pointer"
                disabled={!methods.getCanPreviousPage()}
                onClick={() => methods.setPageIndex(0)}
                type="button"
            >
                {"<<"}
            </button>
            <button
                className="border rounded py-1 px-2 hover:text-sky-500 hover:cursor-pointer"
                disabled={!methods.getCanPreviousPage()}
                onClick={() => methods.previousPage()}
                type="button"
            >
                {"<"}
            </button>
            <button
                className="border rounded py-1 px-2 hover:text-sky-500 hover:cursor-pointer"
                disabled={!methods.getCanNextPage()}
                onClick={() => methods.nextPage()}
                type="button"
            >
                {">"}
            </button>
            <button
                className="border rounded py-1 px-2 hover:text-sky-500 hover:cursor-pointer"
                disabled={!methods.getCanNextPage()}
                onClick={() => methods.setPageIndex(methods.getPageCount() - 1)}
                type="button"
            >
                {">>"}
            </button>
            <span className="flex items-center gap-y-1 px-2">
                <span className="mr-1">Page</span>
                <strong>
                    {methods.getState().pagination.pageIndex + 1} of {methods.getPageCount()}
                </strong>
            </span>
            <span className="flex items-center gap-y-1 pr-2">
                | Go to page:
                <input
                    aria-label="Go to page"
                    className="border py-1 px-2 rounded w-16 ml-2.5"
                    defaultValue={methods.getState().pagination.pageIndex + 1}
                    max={methods.getPageCount()}
                    min="1"
                    onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        methods.setPageIndex(page);
                    }}
                    type="number"
                />
            </span>
            <select
                className="border py-1 px-2 rounded w-auto"
                onChange={(e) => {
                    methods.setPageSize(Number(e.target.value));
                }}
                value={methods.getState().pagination.pageSize}
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    );
}
