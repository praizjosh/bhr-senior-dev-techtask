import { AbsenceType } from "@/lib/types/absence";
import { ColumnHeaderType } from "@/lib/types/ts-table";

const personObj: AbsenceType[] = [
    {
        id: 0,
        startDate: "2022-05-28T04:39:06.470Z",
        days: 9,
        absenceType: "SICKNESS",
        employee: {
            firstName: "Rahaf",
            lastName: "Deckard",
            id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
        },
        approved: true,
        conflicts: undefined,
    },
    {
        id: 1,
        startDate: "2022-02-08T08:02:47.543Z",
        days: 5,
        absenceType: "ANNUAL_LEAVE",
        employee: { firstName: "Enya", lastName: "Behm", id: "84502153-69e6-4561-b2de-8f21f97530d3" },
        approved: true,
        conflicts: undefined,
    },
];

const COLUMN_HEADER_LIST: ColumnHeaderType[] = [
    "id",
    "employee.firstName",
    "employee.lastName",
    "employee.id",
    "startDate",
    "conflicts",
    "absenceType",
    "days",
    "approved",
];

export { COLUMN_HEADER_LIST, personObj };
