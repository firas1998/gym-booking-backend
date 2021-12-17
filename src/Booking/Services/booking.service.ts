import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GymService } from 'src/Gym/Services/gym.service';
import { Gym } from 'src/Gym/Entities/gym.entity';
import { Between, Repository } from 'typeorm';
import { UserService } from '../../User/Services/user.service';
import { BookingDTO } from '../DTOs/booking.dto';
import { Booking } from '../Entities/booking.entity';
import * as moment from 'moment';
import { GlobalConstants } from 'src/GlobalConstants';

@Injectable()
export class BookingService {
    public constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        private readonly userService: UserService,
        private readonly gymService: GymService
    ) { }

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

    public async getBookingsByGymId(gymUUID: string): Promise<Booking[]> {
        const gym = await this.gymService.getGym(gymUUID);
        const bookings = await this.bookingRepository.find({ gym: gym });

        return bookings;
    }

    public async getBookingsByUserId(userUUID: string): Promise<Booking[]> {
        const user = await this.userService.getUser(userUUID);
        const bookings = await this.bookingRepository.find({ creator: user });

        return bookings;
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

    public async createBooking(bookingDTO: BookingDTO): Promise<Booking> {
        const user = await this.userService.getUser(bookingDTO.userId);
        const gym = await this.gymService.getGym(bookingDTO.gymId);

        const activeVisitors = await this.getNumberOfVisitorsDuringDateAndTime(gym, bookingDTO.datetime);
        console.log(activeVisitors);
        if (activeVisitors >= gym.maxVisitors) {
            throw new HttpException('Max number of visitors is reached during this time', HttpStatus.BAD_REQUEST);
        }

        const booking = {
            gym: gym,
            creator: user,
            time: bookingDTO.datetime
        } as Booking;

        const newBooking = await this.bookingRepository.save(booking);

        if (newBooking) {
            return newBooking;
        }

        throw new HttpException(
            'Booking could not be created',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    public async updateBooking(bookingUUID: string, bookingDTO: BookingDTO): Promise<Booking> {
        const booking = await this.getBookingByUuid(bookingUUID);

        const activeVisitors = await this.getNumberOfVisitorsDuringDateAndTime(booking.gym, bookingDTO.datetime);

        if (activeVisitors >= booking.gym.maxVisitors) {
            throw new HttpException('Max number of visitors is reached during this time', HttpStatus.BAD_REQUEST);
        }

        booking.time = bookingDTO.datetime

        const newBooking = await this.bookingRepository.save(booking);

        if (newBooking) {
            return newBooking;
        }

        throw new HttpException(
            'Booking could not be updated',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    public async getBookingByUserAndGymIds(userId: string, gymId: string): Promise<Booking> {
        const user = await this.userService.getUser(userId);
        const gym = await this.gymService.getGym(gymId);
        const booking = await this.bookingRepository.findOne({
            creator: user,
            gym: gym
        });

        return booking;
    }

    public async getNumberOfVisitorsDuringDateAndTime(gym: Gym, datetime: string): Promise<number> {
        const bookingTime = moment(
            datetime,
            GlobalConstants.DATE_TIME_FORMAT
        );
        const bookingTimeString = moment(
            datetime,
            GlobalConstants.DATE_TIME_FORMAT
        ).toString();
        const hourBeforeBookingString = bookingTime
            .subtract(1, 'hour').toString();
        const bookings = await this.bookingRepository.find({
            time: Between(hourBeforeBookingString, bookingTimeString),
            gym: gym
        });

        return bookings.length;
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
        const booking = await this.bookingRepository.findOne({ uuid: uuid }, { relations: ['gym', 'creator'] });
        if (!booking) {
            throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
        }

        return booking;
    }
}
