import { ConsoleLogger, Injectable, Logger, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as moment from 'moment';
import { GlobalConstants } from '../../GlobalConstants';
import { LogLevel } from '../Enums/log-levels.enum';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
    private readonly fileType = 'log';
    private readonly path = 'src/Logs';

    private fullPathInfoFile: string;
    private fullPathErrorFile: string;

    /**
     *Creates an instance of LoggerService.
     * @param {string} [context]
     * @memberof LoggerService
     */
    public constructor(context?: string) {
        super(context);
        this.context = context;

        this.fullPathInfoFile = `${this.path}/${
            LogLevel.INFO
        }-${this.getTodaysDate()}.${this.fileType}`;

        this.fullPathErrorFile = `${this.path}/${
            LogLevel.ERROR
        }-${this.getTodaysDate()}.${this.fileType}`;
    }

    public setContext(context: string) {
        this.context = context;
    }

    /**
     *
     *
     * @param {string} message
     * @param {string} [context]
     * @returns {*}
     * @memberof LoggerService
     */
    public log(message: string, context?: string): void {
        fs.appendFile(
            this.fullPathInfoFile,
            this.prepareMessage(LogLevel.INFO, message),
            'utf-8',
            this.onError
        );
        super.log(message, context);
    }

    /**
     *
     *
     * @param {string} message
     * @param {string} [trace]
     * @param {string} [context]
     * @returns {*}
     * @memberof LoggerService
     */
    public error(message: string, trace?: string, context?: string): void {
        fs.appendFile(
            this.fullPathErrorFile,
            this.prepareMessage(LogLevel.ERROR, message, trace),
            'utf-8',
            this.onError
        );
        super.error(message, trace, context);
    }

    /**
     *
     *
     * @param {string} message
     * @param {string} [context]
     * @returns {*}
     * @memberof LoggerService
     */
    public warn(message: string, context?: string): void {
        fs.appendFile(
            this.fullPathInfoFile,
            this.prepareMessage(LogLevel.WARN, message),
            'utf-8',
            this.onError
        );
        super.warn(message, context);
    }

    /**
     *
     *
     * @param {string} message
     * @param {string} [context]
     * @returns {*}
     * @memberof LoggerService
     */
    public debug(message: string, context?: string): void {
        fs.appendFile(
            this.fullPathInfoFile,
            this.prepareMessage(LogLevel.DEBUG, message),
            'utf-8',
            this.onError
        );
        super.debug(message, context);
    }

    /**
     *
     *
     * @private
     * @param {string} message
     * @param {string} [trace]
     * @returns {string}
     * @memberof LoggerService
     */
    private prepareMessage(
        logLevel: LogLevel,
        message: string,
        trace?: string
    ): string {
        const timestamp = this.getTimeStamp();
        const log = {
            timestamp: timestamp,
            level: logLevel,
            message: message
        };

        if (logLevel === LogLevel.ERROR) {
            log['trace'] = trace;
        }
        return `\n${JSON.stringify(log)}`;
    }

    /**
     *
     *
     * @private
     * @returns {string}
     * @memberof LoggerService
     */
    private getTodaysDate(): string {
        return moment(new Date()).format(GlobalConstants.DATE_FORMAT);
    }

    /**
     *
     *
     * @private
     * @returns {string}
     * @memberof LoggerService
     */
    private getTimeStamp(): string {
        return moment(new Date()).format(GlobalConstants.TIMESTAMP_FORMAT);
    }

    /**
     *
     *
     * @private
     * @param {*} err
     */
    private onError(err: any): void {
        if (err) {
            throw err;
        }
    }
}
