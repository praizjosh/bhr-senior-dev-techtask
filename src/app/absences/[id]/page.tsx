import { notFound } from "next/navigation";

import AbsenceCard from "@/components/ui/core/AbsenceCard/AbsenceCard";

const SingleAbsence = async ({ params }: { params: Promise<{ id: string }> }) => {
    const Params = await params;
    const { id } = Params;

    if (!id) {
        return notFound();
    }
    return (
        <main className="px-6 lg-px-0 lg:container mx-auto p-4">
            <AbsenceCard employeeId={id} />
        </main>
    );
};

export default SingleAbsence;
