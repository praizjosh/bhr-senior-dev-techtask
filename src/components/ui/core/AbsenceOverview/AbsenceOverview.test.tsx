import "@testing-library/jest-dom";

import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

import AbsenceOverview from "@/components/ui/core/AbsenceOverview/AbsenceOverview";
import { MOCK_ABSENCES } from "@/lib/api/defaultData";

const renderAbsenceOverviewComponent = () => {
    render(<AbsenceOverview />);
};

describe("AbsenceOverview", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the loading state", () => {
        (useQuery as jest.Mock).mockReturnValueOnce({
            data: undefined,
            isLoading: true,
            error: null,
        });

        renderAbsenceOverviewComponent();

        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("should load absence data", () => {
        (useQuery as jest.Mock).mockReturnValueOnce({
            data: MOCK_ABSENCES,
            isLoading: false,
            isError: false,
        });
        renderAbsenceOverviewComponent();

        const element = screen.getByText(/Employee Absence Overview/i);

        expect(element).toBeInTheDocument();
    });

    it("display error if there is an error", () => {
        (useQuery as jest.Mock).mockReturnValueOnce({
            data: undefined,
            isLoading: false,
            isError: true,
        });
        renderAbsenceOverviewComponent();

        const errorElement = screen.getByText(/Error/i);
        expect(errorElement).toBeInTheDocument();
    });
});
