import { EmployeeType } from "./person";

export type AbsenceType = {
    id: number;
    startDate: string;
    days: number;
    absenceType: "SICKNESS" | "ANNUAL_LEAVE" | "UNPAID_LEAVE";
    employee: EmployeeType;
    approved: boolean;
    conflicts?: boolean;
};
