import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../Logger/Services/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    public constructor(private readonly loggerService: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestDestination = context
            .switchToHttp()
            .getRequest<Request>().originalUrl;
        const userIP = context.switchToHttp().getRequest<Request>().ip;
        return next
            .handle()
            .pipe(
                tap(() =>
                    this.log(
                        `New request received to ${requestDestination} from ${userIP}`
                    )
                )
            );
    }

    private log(message: string): void {
        this.loggerService.log(message);
    }
}
