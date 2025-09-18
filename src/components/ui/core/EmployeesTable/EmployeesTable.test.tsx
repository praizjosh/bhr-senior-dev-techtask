import "@testing-library/jest-dom";

import { ColumnDef } from "@tanstack/react-table";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPush } from "jest.setup";
import { useRouter } from "next/navigation";

import EmployeesTable from "@/components/ui/core/EmployeesTable/EmployeesTable";
import { MOCK_ABSENCES } from "@/lib/api/defaultData";
import config from "@/lib/config";
import { AbsenceType } from "@/lib/types/absence";

const renderTableComponent = () => {
    const columns: ColumnDef<AbsenceType, any>[] = [];

    render(<EmployeesTable columns={columns} queryData={MOCK_ABSENCES} />);
};

describe("EmployeesTable", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders table", () => {
        renderTableComponent();
        expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it('Should display all rows with data-testid="table-row"', () => {
        renderTableComponent();
        const dataSlotRows = screen.getAllByTestId("table-row");
        // Check if the number of rows is equal to the page size + 1 (for the header row)
        expect(dataSlotRows.length).toBe(config.PAGE_SIZE + 1);
    });

    it("should navigate to /absence when a row is clicked", async () => {
        const user = userEvent.setup();

        renderTableComponent();
        const firstRow = screen.getAllByTestId("table-row")[1]; // Get the first data row (index 0 is header)
        firstRow.click();

        await user.click(firstRow);

        await waitFor(() => {
            expect(useRouter).toHaveBeenCalledTimes(1);
            expect(mockPush).toHaveBeenCalledWith("/absences/id-0");
        });
    });
});
