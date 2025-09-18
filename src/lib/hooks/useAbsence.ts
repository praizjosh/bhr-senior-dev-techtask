import { useQuery } from "@tanstack/react-query";

import getAbsences from "@/lib/api/getAbsences";

const useAbsence = () => {
    const { isLoading, error, data, isError } = useQuery({
        queryKey: ["absences"],
        queryFn: getAbsences,
    });
    return { isLoading, error, data, isError };
};

export default useAbsence;
