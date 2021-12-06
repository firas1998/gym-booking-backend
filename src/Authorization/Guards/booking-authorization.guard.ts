import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthorizationService } from '../Services/authorization.service';
import { GlobalConstants } from 'src/GlobalConstants';

@Injectable()
export class BookingAuthorizationGuard implements CanActivate {
    public constructor(
        private readonly authorizationService: AuthorizationService,
    ) {}

    /**
     *
     *
     * @param {ExecutionContext} context
     * @returns {(boolean | Promise<boolean> | Observable<boolean>)}
     * @memberof AuthGuard
     */
    public canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        return this.validateRequest(request);
    }

    /**
     *
     *
     * @private
     * @param {Request} request
     * @returns {boolean}
     * @memberof AuthGuard
     */
    private async validateRequest(request: Request): Promise<boolean> {
        const bookingUUID = request.params.bookingId || request.body.bookingId;
        const userUuid = request.header(GlobalConstants.USER_HEADER);

        const isUserBookingCreator = await this.authorizationService.isUserBookingreator(
            bookingUUID,
            userUuid
        );

        if (!isUserBookingCreator) {
            throw new HttpException('This is not yours', HttpStatus.FORBIDDEN);
        }

        return isUserBookingCreator;
    }
}
