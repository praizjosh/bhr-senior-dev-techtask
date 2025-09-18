import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import AbsenceCard from "@/components/ui/core/AbsenceCard/AbsenceCard";
import useAbsence from "@/lib/hooks/useAbsence";

const absence = {
    id: 1,
    startDate: "12/12/2025",
    days: 5,
    absenceType: "SICKNESS",
    endDate: "13/12/2025",
    approved: true,
    conflicts: false,
    employee: {
        firstName: "FirstName",
        lastName: "LastName",
        id: "1",
    },
} as const;

const renderAbsenceCardComponent = () => {
    render(<AbsenceCard employeeId="1" />);
};

jest.mock("@/lib/hooks/useAbsence");
const mockedUseAbsence = useAbsence as jest.MockedFunction<typeof useAbsence>;

describe("AbsenceCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render loading skeletons when loading", () => {
        mockedUseAbsence.mockReturnValueOnce({
            data: undefined,
            isLoading: true,
            isError: false,
            error: null,
        });

        renderAbsenceCardComponent();
        const loadingElement = screen.getByTestId("absence-card-skeleton-1");
        expect(loadingElement).toBeInTheDocument();
    });

    it("should render 'No absences found.' if employee has no absences", () => {
        mockedUseAbsence.mockReturnValueOnce({
            data: [],
            isLoading: false,
            isError: false,
            error: null,
        });

        renderAbsenceCardComponent();
        expect(screen.getByText("No absences found.")).toBeInTheDocument();
    });

    it("should render employee's absences info", () => {
        mockedUseAbsence.mockReturnValueOnce({
            data: [absence],
            isLoading: false,
            isError: false,
            error: null,
        });

        renderAbsenceCardComponent();

        expect(screen.getByText(/Back to Absence Overview/i)).toBeInTheDocument();
        expect(screen.getByText(/Total Absences:/i)).toBeInTheDocument();
        expect(screen.getByText(/Frequently Absent:/i)).toBeInTheDocument();
        expect(screen.getByText(/start date:/i)).toBeInTheDocument();
        expect(screen.getByText(/end date:/i)).toBeInTheDocument();
        expect(screen.getByText(/absence type:/i)).toBeInTheDocument();
        expect(screen.getByText(/sickness/i)).toBeInTheDocument();
        expect(screen.getByText(/conflicts/i)).toBeInTheDocument();
    });
});
