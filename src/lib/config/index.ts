type Config = {
    ABSENCE_API_URL: string;
    CONFLICT_API_URL: string;
    STALE_TIME: number;
    dateFormat: string;
    PAGE_SIZE: number;
    ABSENCE_THRESHOLD_DAYS: number;
};

const config: Config = {
    ABSENCE_API_URL: "https://front-end-kata.brighthr.workers.dev/api/absences",
    CONFLICT_API_URL: "https://front-end-kata.brighthr.workers.dev/api/conflict",
    STALE_TIME: 5 * 60 * 1000,
    dateFormat: "en-GB",
    PAGE_SIZE: 10,
    ABSENCE_THRESHOLD_DAYS: 2,
};

export default config;
