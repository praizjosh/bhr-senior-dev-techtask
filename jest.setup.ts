import "@testing-library/jest-dom";

const mockPush = jest.fn();

jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useQuery: jest.fn(),
}));

jest.mock("next/navigation", () => {
    return {
        useRouter: jest.fn(() => ({
            push: mockPush,
            replace: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
        })),
        useSearchParams: () => ({
            get: () => {},
        }),
        notFound: jest.fn(),
        usePathname: () => "mockPathname",
    };
});

export { mockPush };
