import AbsenceCard from "@/components/ui/core/AbsenceCard";

const SingleAbsence = ({ params }: { params: { id: string } }) => {
    return (
        <main className="container mx-auto p-4">
            <AbsenceCard id={params.id} />
        </main>
    );
};

export default SingleAbsence;
