import { AbsenceType } from "./person";

// TColumnHeader
export type ColumnHeaderType = keyof AbsenceType | "employee.firstName" | "employee.lastName" | "employee.id";

export type CellConfigType = {
    type: "id" | "approved" | "date" | "absenceType" | "employeeId" | "name" | "default";
    className?: string;
    format?: (value: string) => string;
};

// Updated transformCell function
// Define interfaces for better type safety
export interface CellInfoType<T = unknown> {
    getValue: () => T;
    column: {
        id: string;
    };

    row: {
        index: number;
        id: string;
        getValue: (key: string) => T;
    };

    // Include other properties that might be used in the future
}

// pagination
export type PaginationType = {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
};

export type PaginationState = {
    pageIndex: number;
    pageSize: number;
};

export type PaginationTableState = {
    pagination: PaginationState;
};

export type PaginationInitialTableState = {
    pagination?: Partial<PaginationState>;
};

// sorting
type ColumnSort = {
    id: string;
    desc: boolean;
};
export type SortingState = ColumnSort[];
