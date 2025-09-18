import axios from "axios";

import getAbsences from "@/lib/api/getAbsences/getAbsences";
import config from "@/lib/config";
import { AbsenceType } from "@/lib/types/absence";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAbsences (integration test)", () => {
    const absences: AbsenceType[] = [
        {
            id: 1,
            startDate: "2023-01-01",
            days: 5,
            absenceType: "SICKNESS",
            employee: { firstName: "John", lastName: "Doe", id: "emp-1" },
            approved: true,
            conflicts: undefined,
        },
        {
            id: 2,
            startDate: "2023-02-01",
            days: 3,
            absenceType: "ANNUAL_LEAVE",
            employee: { firstName: "Jane", lastName: "Smith", id: "emp-2" },
            approved: false,
            conflicts: undefined,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("fetches absences and their conflicts", async () => {
        mockedAxios.get.mockImplementation((url: string) => {
            if (url === config.ABSENCE_API_URL) {
                return Promise.resolve({ data: absences });
            }
            if (url === `${config.CONFLICT_API_URL}/1`) {
                return Promise.resolve({ data: { conflicts: true } });
            }
            if (url === `${config.CONFLICT_API_URL}/2`) {
                return Promise.resolve({ data: { conflicts: false } });
            }
            return Promise.reject(new Error("Unknown URL"));
        });

        const result = await getAbsences();

        expect(result).toEqual([
            { ...absences[0], conflicts: true },
            { ...absences[1], conflicts: false },
        ]);
        expect(mockedAxios.get).toHaveBeenCalledWith(config.ABSENCE_API_URL);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${config.CONFLICT_API_URL}/1`);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${config.CONFLICT_API_URL}/2`);
    });

    it("throws error if fetching absences fails", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("API error"));
        await expect(getAbsences()).rejects.toThrow("API error");
    });

    it("throws error if fetching conflicts fails", async () => {
        mockedAxios.get.mockImplementation((url: string) => {
            if (url === config.ABSENCE_API_URL) {
                return Promise.resolve({ data: absences });
            }
            if (url === `${config.CONFLICT_API_URL}/1`) {
                return Promise.reject(new Error("Conflict error"));
            }
            if (url === `${config.CONFLICT_API_URL}/2`) {
                return Promise.resolve({ data: { conflicts: false } });
            }
            return Promise.reject(new Error("Unknown URL"));
        });
        await expect(getAbsences()).rejects.toThrow(
            "An error occurred while fetching conflicts for absence ID 1: Error: Conflict error",
        );
    });
});
