import { useState } from "react";

type Absence = {
    id: string | number;
    date: string;
    reason: string;
    type: string; // e.g., 'Sick', 'Vacation', etc.
};

type AbsenceCardProps = {
    employeeName: string;
    absences: Absence[];
    role?: string;
    department?: string;
    avatarUrl?: string;
};

export default function AbsenceCard({ id, employeeName, absences, role, department, avatarUrl }: AbsenceCardProps) {
    const [showAbsences, setShowAbsences] = useState(false);

    if (!employeeName) {
        return <div>Error: No employee name provided.</div>;
    }

    // Count absences by type
    const absenceTypeSummary: Record<string, number> = {};
    absences.forEach((a) => {
        absenceTypeSummary[a.type] = (absenceTypeSummary[a.type] || 0) + 1;
    });

    // Show warning if absences exceed threshold
    const absenceThreshold = 5;
    const isFrequentAbsent = absences.length > absenceThreshold;

    // Show up to 3 most recent absences
    const sortedAbsences = [...absences].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const recentAbsences = sortedAbsences.slice(0, 3);

    return (
        <div
            style={{
                border: isFrequentAbsent ? "2px solid #e57373" : "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                maxWidth: 400,
                background: isFrequentAbsent ? "#fff3f3" : "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                {avatarUrl && (
                    <img
                        alt={employeeName}
                        src={avatarUrl}
                        style={{ width: 48, height: 48, borderRadius: "50%", marginRight: 12, objectFit: "cover" }}
                    />
                )}
                <div>
                    <button
                        onClick={() => setShowAbsences((prev) => !prev)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#0070f3",
                            cursor: "pointer",
                            fontSize: 20,
                            fontWeight: 700,
                            padding: 0,
                        }}
                    >
                        {employeeName}
                    </button>
                    <div style={{ fontSize: 14, color: "#666" }}>
                        {role && <span>{role}</span>}
                        {role && department && <span> &middot; </span>}
                        {department && <span>{department}</span>}
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 8 }}>
                <strong>Total Absences:</strong> {absences.length}
                {isFrequentAbsent && (
                    <span style={{ color: "#d32f2f", marginLeft: 8, fontWeight: 600 }}>(Frequent Absentee)</span>
                )}
            </div>
            <div style={{ marginBottom: 8 }}>
                <strong>Absence Types:</strong>
                {Object.keys(absenceTypeSummary).length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {Object.entries(absenceTypeSummary).map(([type, count]) => (
                            <li key={type}>
                                {type}: {count}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span> None</span>
                )}
            </div>
            <div>
                <strong>Recent Absences:</strong>
                {recentAbsences.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {recentAbsences.map((absence) => (
                            <li key={absence.id}>
                                <span style={{ fontWeight: 600 }}>{absence.date}</span> -
                                <span style={{ marginLeft: 4 }}>{absence.type}</span>
                                {absence.reason && (
                                    <span style={{ marginLeft: 8, color: "#555" }}>({absence.reason})</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span> None</span>
                )}
            </div>
            {absences.length > 3 && (
                <div style={{ marginTop: 10 }}>
                    <button
                        onClick={() => setShowAbsences((prev) => !prev)}
                        style={{
                            background: "#f5f5f5",
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            padding: "4px 10px",
                            cursor: "pointer",
                            fontSize: 14,
                            marginTop: 4,
                        }}
                    >
                        {showAbsences ? "Hide Full Absence History" : "Show Full Absence History"}
                    </button>
                </div>
            )}
            {showAbsences && (
                <div style={{ marginTop: 12 }}>
                    <h4 style={{ margin: 0 }}>All Absences:</h4>
                    {absences && absences.length > 0 ? (
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                            {sortedAbsences.map((absence) => (
                                <li key={absence.id}>
                                    <span style={{ fontWeight: 600 }}>{absence.date}</span> -
                                    <span style={{ marginLeft: 4 }}>{absence.type}</span>
                                    {absence.reason && (
                                        <span style={{ marginLeft: 8, color: "#555" }}>({absence.reason})</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>No absences found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
