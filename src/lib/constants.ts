import { createColumnHelper } from "@tanstack/react-table";

import { AbsenceType } from "@/lib/types/absence";

// Defined constants outside components to prevent recreation

const ABSENCE_TYPE_CLASSES: Record<string, string> = {
    SICKNESS: "bg-red-100 text-red-700",
    ANNUAL_LEAVE: "bg-purple-100 text-purple-800",
    DEFAULT: "bg-sky-100 text-sky-600",
};

const columnHelper = createColumnHelper<AbsenceType>();
const NON_SORTABLE_COLUMNS = ["no", "id", "newSeoTitle", "newSeoDescription"];
const NON_RESIZABLE_COLUMNS = ["no", "id", "lastUpdated"];

export { ABSENCE_TYPE_CLASSES, columnHelper, NON_RESIZABLE_COLUMNS, NON_SORTABLE_COLUMNS };
