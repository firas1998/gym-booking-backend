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
    EVENTS: {
        USER_CREATED_EVENT: 'USER_CREATED',
        USER_UPDATED_EVENT: 'USER_UPDATED'
    },
    MICROSERVICE_NAME: process.env.MICROSERVICE_NAME,
    MICROSERVICE_GAME_QUEUE: process.env.MICROSERVICE_GAME_QUEUE,
    MICROSERVICE_USER_QUEUE: process.env.MICROSERVICE_USER_QUEUE,
    MICROSERVICE_PLAYGROUND_QUEUE: process.env.MICROSERVICE_PLAYGROUND_QUEUE,
    PUSH_NOTIFICATIONS: {
        URL: 'https://exp.host/--/api/v2/push/send',
        NEW_REQUEST: 'Someone requested to join your game !',
        REQUEST_ACCEPTED: 'Your request to join was accepted !',
        REQUEST_REJECTED: 'Your request to join was rejected :`(',
        GAME_UPDATED:
            "A game that you're part of was updated, see what changed !"
    }
};
