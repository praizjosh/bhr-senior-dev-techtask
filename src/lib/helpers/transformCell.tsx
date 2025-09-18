import { CellConfigType, CellInfoType } from "@/lib/types/ts-table";
import { cn, formatDate, isConflictValue, transformMixedCaseToSpaces } from "@/lib/utils";

import { ABSENCE_TYPE_CLASSES } from "../constants";

const createCellRenderer = (config: CellConfigType) => {
    const CellRenderer = (info: CellInfoType) => {
        const { row, getValue } = info;
        const value = getValue();

        switch (config.type) {
            case "id":
                return <span>{row.index + 1}</span>;

            case "approved":
                return (
                    <span
                        className={cn(`px-2 py-1 capitalize rounded-full text-xs font-medium`, {
                            "bg-green-100 text-green-800": value,
                            "bg-yellow-100 text-yellow-800": !value,
                        })}
                    >
                        {value ? "✓ Approved" : "⏳ Pending"}
                    </span>
                );

            case "date":
                return <span className={`text-sm ${config.className ?? ""}`}>{formatDate(String(value))}</span>;

            case "conflicts": {
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

            case "absenceType":
                return (
                    <span
                        className={cn(
                            `px-2 py-1 capitalize rounded-full text-xs font-medium`,
                            ABSENCE_TYPE_CLASSES[String(value)] ?? ABSENCE_TYPE_CLASSES.DEFAULT,
                        )}
                    >
                        {transformMixedCaseToSpaces(String(value))}
                    </span>
                );

            case "employeeId":
                return (
                    <span className="font-mono text-xs text-gray-600 max-w-[100px] truncate block">
                        {String(value)}
                    </span>
                );

            case "name":
                return <span className={`capitalize font-medium ${config.className ?? ""}`}>{String(value)}</span>;

            default:
                return config.format ? config.format(String(value)) : value;
        }
    };

    CellRenderer.displayName = `CellRenderer_${config.type ?? "default"}`;
    return CellRenderer;
};

// Column configuration mapping
const columnConfigs: Record<string, CellConfigType> = {
    id: { type: "id" },
    approved: { type: "approved" },
    startDate: { type: "date" },
    absenceType: { type: "absenceType" },
    "employee.id": { type: "employeeId" },
    "employee.firstName": { type: "name" },
    "employee.lastName": { type: "name" },
    conflicts: { type: "conflicts" },
    days: {
        type: "default",
        format: (value) => `${value} day${Number(value) !== 1 ? "s" : ""}`,
        className: "font-medium",
    },
};

export default function transformCell(info: CellInfoType) {
    const columnId = info.column.id;
    const config = columnConfigs[columnId] ?? { type: "default" };
    const renderer = createCellRenderer(config);

    return renderer(info);
}
