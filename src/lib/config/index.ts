type Config = {
    ABSENCE_API_URL: string;
    CONFLICT_API_URL: string;
    STALE_TIME: number;
    dateFormat: string;
};

const config: Config = {
    ABSENCE_API_URL: "https://front-end-kata.brighthr.workers.dev/api/absences",
    CONFLICT_API_URL: "https://front-end-kata.brighthr.workers.dev/api/conflict",
    STALE_TIME: 5 * 60 * 1000,
    dateFormat: "en-GB",
};

export default config;
