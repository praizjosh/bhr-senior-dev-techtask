"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode, useMemo } from "react";

import AbsenceCardSkeleton from "@/components/ui/skeletons/AbsenceCardSkeleton";
import config from "@/lib/config";
import { ABSENCE_TYPE_CLASSES } from "@/lib/constants";
import useAbsence from "@/lib/hooks/useAbsence";
import { AbsenceType } from "@/lib/types/absence";
import { cn, formatDate, getEndDate, isConflictValue, transformMixedCaseToSpaces } from "@/lib/utils";

type AbsenceCardProps = {
    employeeId: string;
};

function renderAbsenceValue(key: string, value: any) {
    if (key === "approved") {
        return (
            <span className="px-2 py-1 capitalize rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Approved
            </span>
        );
    }

    if (key === "conflicts") {
        return (
            <span
                className={cn("px-2 py-1 capitalize rounded-full text-xs font-medium", {
                    "bg-red-100 text-red-600": isConflictValue(value),
                })}
            >
                {isConflictValue(value) ? "Yes" : "No"}
            </span>
        );
    }
    if (key === "absenceType") {
        return (
            <span
                className={cn(
                    `px-2 py-1 capitalize rounded-full text-xs font-medium`,
                    ABSENCE_TYPE_CLASSES[value] ?? ABSENCE_TYPE_CLASSES.DEFAULT,
                )}
            >
                {transformMixedCaseToSpaces(value)}
            </span>
        );
    }
    if (key.toLowerCase().includes("date") && value) {
        return formatDate(String(value));
    }
    return String(value);
}

export default function AbsenceCard({ employeeId }: AbsenceCardProps) {
    const { data: absences, isLoading } = useAbsence();

    const allEmployeeAbsences: AbsenceType[] = useMemo(
        () => (absences ? absences.filter((absence) => absence.employee.id === employeeId) : []),
        [absences, employeeId],
    );

    const employeeDetails = useMemo(() => {
        if (!allEmployeeAbsences || allEmployeeAbsences.length === 0) return null;
        const { employee } = allEmployeeAbsences[0];
        return employee;
    }, [allEmployeeAbsences]);

    if (!employeeId) {
        return notFound();
    }

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 flex size-full flex-col gap-6">
                <div className="grid animate-pulse">
                    <div aria-label="Back to Absence Overview" className="inline-flex items-center gap-1.5">
                        <span className="size-5 rounded-full bg-slate-300" />
                        <span className="h-4 w-32 bg-slate-300 rounded" />
                    </div>
                    <hr className="border my-2 border-slate-200" />
                    <span className="h-6 w-full md:w-44 bg-slate-300 rounded" />
                    <div className="mt-2 grid gap-2">
                        <span className="h-4 w-32 bg-slate-300 rounded" />
                        <span className="h-4 w-52 bg-slate-300 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <AbsenceCardSkeleton key={i} data-testid={`absence-card-skeleton-${i}`} />
                    ))}
                </div>
            </div>
        );
    }
    if (!allEmployeeAbsences || allEmployeeAbsences.length === 0) return <div>No absences found.</div>;

    // Show warning if absences exceed threshold
    const isFrequentAbsent = allEmployeeAbsences.length > config.ABSENCE_THRESHOLD_DAYS;

    return (
        <>
            <div className="container mx-auto p-4 flex size-full flex-col gap-6">
                <div className="grid">
                    <Link
                        aria-label="Back to Absence Overview"
                        className="inline-flex items-center hover:text-sky-500 w-fit"
                        href={"/"}
                    >
                        <svg
                            className="hover:text-sky-500 size-4 mr-2"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                        Back To Absence Overview
                    </Link>

                    <hr className="border my-2 border-slate-200" />
                    <h1 className="text-2xl font-bold text-sky-600">
                        List of Absences for {employeeDetails?.firstName} {employeeDetails?.lastName}
                    </h1>
                    <div className="mt-2 grid gap-1">
                        <p>
                            <strong>Total Absences:</strong> {allEmployeeAbsences.length}
                        </p>
                        <p className={cn({ "text-red-500": isFrequentAbsent })}>
                            <strong>Frequently Absent:</strong> {isFrequentAbsent ? "Yes" : "No"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {allEmployeeAbsences.length > 0 &&
                        allEmployeeAbsences.map((absence, i) => (
                            <div
                                key={absence.id}
                                className="flex *:w-full gap-y-2 flex-col border-2 p-4 mb-4 rounded bg-gray-50 border-sky-200"
                                tabIndex={i}
                            >
                                {/* Render all fields except employee and id, and insert endDate after startDate */}
                                {(() => {
                                    const entries = Object.entries(absence).filter(
                                        ([key]) => key !== "employee" && key !== "id",
                                    );
                                    const result: ReactNode[] = [];
                                    entries.forEach(([key, value]) => {
                                        result.push(
                                            <div key={key} className="flex gap-4 justify-between">
                                                <span className="font-semibold capitalize">
                                                    {transformMixedCaseToSpaces(key)}:
                                                </span>
                                                <span className="capitalize">{renderAbsenceValue(key, value)}</span>
                                            </div>,
                                        );
                                        if (
                                            key === "startDate" &&
                                            absence.startDate &&
                                            typeof absence.days === "number"
                                        ) {
                                            result.push(
                                                <div key="endDate" className="flex gap-4 justify-between">
                                                    <span className="font-semibold capitalize">End date:</span>
                                                    <span className="capitalize">
                                                        {renderAbsenceValue(
                                                            "endDate",
                                                            getEndDate(absence.startDate, absence.days),
                                                        )}
                                                    </span>
                                                </div>,
                                            );
                                        }
                                    });
                                    return result;
                                })()}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
