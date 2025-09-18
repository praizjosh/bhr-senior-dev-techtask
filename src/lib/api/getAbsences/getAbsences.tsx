import axios from "axios";

import config from "@/lib/config";
import { AbsenceType } from "@/lib/types/absence";

// Helper to fetch conflicts for a single absence, with error handling
const fetchConflicts = async (absenceId: string | number): Promise<boolean | undefined> => {
    try {
        const { data } = await axios.get<{ conflicts?: boolean }>(`${config.CONFLICT_API_URL}/${absenceId}`);

        return data.conflicts;
    } catch (error) {
        throw new Error(`An error occurred while fetching conflicts for absence ID ${absenceId}: ${error}`);
    }
};

export default async function getAbsences(): Promise<AbsenceType[]> {
    try {
        const { data: absences } = await axios.get<AbsenceType[]>(config.ABSENCE_API_URL);

        // Fetch conflicts for each absence
        const absencesWithConflicts: AbsenceType[] = await Promise.all(
            absences.map(async (absence) => {
                const conflicts = await fetchConflicts(absence.id);
                return {
                    ...absence,
                    conflicts,
                };
            }),
        );

        return absencesWithConflicts;
    } catch (error) {
        throw new Error(`${error}`);
    }
}
