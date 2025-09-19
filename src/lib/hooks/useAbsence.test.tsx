import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";

import { MOCK_ABSENCES } from "@/lib/api/defaultData";
import useAbsence from "@/lib/hooks/useAbsence";

describe("useAbsence Hook", () => {
    const mockUseQuery = useQuery as jest.Mock;
    beforeEach(() => {
        jest.clearAllMocks();
        if (typeof mockUseQuery.mockReset === "function") {
            mockUseQuery.mockReset();
        }
    });

    const QueryProvider = () => {
        const queryClient = new QueryClient();
        const wrapper = ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
        return wrapper;
    };

    it("should return loading state initially", () => {
        mockUseQuery.mockReturnValue({
            isLoading: true,
            error: null,
            data: undefined,
            isError: false,
        });

        const { result } = renderHook(() => useAbsence(), {
            wrapper: QueryProvider(),
        });

        expect(result.current.isLoading).toBe(true);
    });

    it("should return data after fetching", () => {
        mockUseQuery.mockReturnValue({
            isLoading: false,
            error: null,
            data: MOCK_ABSENCES,
            isError: false,
        });

        const { result } = renderHook(() => useAbsence(), {
            wrapper: QueryProvider(),
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(MOCK_ABSENCES);
    });
});
