import { HTMLAttributes } from "react";

export default function AbsenceCardSkeleton({ ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className="flex *:w-full gap-y-2 flex-col border-2 p-4 mb-4 rounded bg-gray-50 border-sky-200 animate-pulse"
            {...props}
        >
            {[...Array(4)].map((_, idx) => (
                <div key={idx} className="flex gap-4 justify-between">
                    <span className="h-4 w-24 bg-slate-200 rounded" />
                    <span className="h-4 w-20 bg-slate-100 rounded" />
                </div>
            ))}
        </div>
    );
}
