import { Injectable } from '@nestjs/common';
import { BookingService } from 'src/Booking/Services/booking.service';

@Injectable()
export class AuthorizationService {
    public constructor(private readonly bookingService: BookingService) {}

    /**
     *
     *
     * @param {string} gameUuid
     * @param {string} userUuid
     * @returns {Promise<boolean>}
     * @memberof AuthorizationService
     */
    public async isUserBookingreator(
        bookingUUID: string,
        userUUID: string
    ): Promise<boolean> {
        const booking = await this.bookingService.getBooking(bookingUUID);

        return booking.creator.uuid === userUUID;
    }
}
