import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const GlobalConstants = {
    DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss ZZ',
    DATE_FORMAT: 'YYYY-MM-DD',
    TIMESTAMP_FORMAT: 'HH:MM:ss.SS DD/MM/YYYY',
    USER_HEADER: 'user_id',
    SLEEP: async (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },
};
