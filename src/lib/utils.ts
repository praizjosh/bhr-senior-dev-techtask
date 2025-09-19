import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import config from "@/lib/config";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(config.dateFormat, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

/**
 * Returns an ISO string for the end date, given a start date string and number of days to add.
 * @param startDate ISO date string
 * @param days Number of days to add
 * @returns ISO string for the end date
 */
export function getEndDate(startDate: string, days: number): string {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return date.toISOString();
}

export function transformCamelCaseToSpaces(str: string): string {
    // Handles nested titles like "employee.firstName"
    const parts = str.split(".");
    const lastPart = parts[parts.length - 1];
    return lastPart.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
}

export function transformMixedCaseToSpaces(str: string): string {
    return str
        .replace(/[._]/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .toLowerCase();
}

export function isConflictValue(value: unknown): boolean {
    return value === true || value === "true";
}
