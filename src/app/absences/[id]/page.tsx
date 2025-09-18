import { notFound } from "next/navigation";

import AbsenceCard from "@/components/ui/core/AbsenceCard/AbsenceCard";

const SingleAbsence = async ({ params }: { params: { id: string } }) => {
    const Params = await params;
    const { id } = Params;

    if (!id) {
        return notFound();
    }
    return (
        <main className="container mx-auto p-4">
            <AbsenceCard employeeId={id} />
        </main>
    );
};

export default SingleAbsence;
