import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../User/Services/user.service';
import { Booking } from '../Entities/booking.entity';

@Injectable()
export class BookingService {
    public constructor(
        private readonly userService: UserService,
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>
    ) {}

    /**
     *
     *
     * @param {string} uuid
     * @returns {Promise<Booking>}
     * @memberof BookingService
     */
    public async getBooking(uuid: string): Promise<Booking> {
        const booking = await this.getBookingByUuid(uuid);

        return booking;
    }

    /**
     *
     *
     * @param {string} uuid
     * @returns {Promise<Booking>}
     * @memberof BookingService
     */
    public async deleteBooking(uuid: string): Promise<Booking> {
        const booking = await this.getBookingByUuid(uuid);
        const deletedBooking = await this.bookingRepository.remove(booking);

        return deletedBooking;
    }

    /**
     *
     *
     * @private
     * @param {string} uuid
     * @returns {Promise<Booking>}
     * @memberof BookingService
     */
    private async getBookingByUuid(uuid: string): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({ uuid: uuid });
        if (!booking) {
            throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
        }

        return booking;
    }
}
