import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    Res,
    UseFilters,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import { LoggerService } from '../../Logger/Services/logger.service';
import { Response, Request } from 'express';
import { HttpExceptionFilter } from '../../Exceptions/Filters/http.exception.filter';
import { ValidationPipe } from '../../Pipes/validation.pipe';
import { PipeType } from '../../Pipes/Enums/type.enum';
import { GlobalConstants } from '../../GlobalConstants';
import { LoggerInterceptor } from '../../Interceptors/logger.interceptor';
import { BookingService } from '../Services/booking.service';
import { CreateBookingValidationSchema } from '../Validation/create-booking.validation-schema';
import { BookingDTO } from '../DTOs/booking.dto';
import { UpdateBookingValidationSchema } from '../Validation/update-booking.validation-schema copy';
import { BookingAuthorizationGuard } from '../../Authorization/Guards/booking-authorization.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggerInterceptor)
@ApiTags('Booking')
@ApiBearerAuth()
@Controller()
export class BookingController {
    public constructor(
        private loggerService: LoggerService,
        private readonly bookingService: BookingService
    ) {
        this.loggerService.setContext(this.constructor.name);
    }

    @Get('/booking/:bookingId')
    public async getBooking(
        @Req() req: Request,
        @Res() res: Response,
        @Param('bookingId') uuid: string
    ): Promise<Response> {
        const booking = await this.bookingService.getBooking(uuid);

        return res.status(HttpStatus.OK).json(booking);
    }

    @Get('/bookings')
    public async getUserBooking(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<Response> {
        const userId = req.header(GlobalConstants.USER_HEADER);
        const bookings = await this.bookingService.getBookingsByUserId(userId);

        return res.status(HttpStatus.OK).json(bookings);
    }

    @Get('/bookings/gym/:gymId')
    public async getBookingsInGym(
        @Req() req: Request,
        @Res() res: Response,
        @Param('gymId') uuid: string,
    ): Promise<Response> {
        const userId = req.header(GlobalConstants.USER_HEADER);
        const bookings = await this.bookingService.getBookingsByGymId(uuid);

        return res.status(HttpStatus.OK).json(bookings);
    }

    @UsePipes(new ValidationPipe(CreateBookingValidationSchema, PipeType.HTTP))
    @Post('/book')
    public async createBooking(
        @Req() req: Request,
        @Res() res: Response,
        @Body() bookingDTO: BookingDTO
    ): Promise<Response> {
        const booking = bookingDTO;
        booking.userId = req.header(GlobalConstants.USER_HEADER);
        const newBooking = await this.bookingService.createBooking(booking);

        return res.status(HttpStatus.OK).json(newBooking);
    }

    @UseGuards(BookingAuthorizationGuard)
    //@UsePipes(new ValidationPipe(UpdateBookingValidationSchema, PipeType.HTTP))
    @Patch('/booking/:bookingId/update')
    public async createUser(
        @Req() req: Request,
        @Res() res: Response,
        @Param('bookingId') uuid: string,
        @Body() bookingDTO: BookingDTO
    ): Promise<Response> {
        console.log(uuid);
        const booking = bookingDTO;
        booking.userId = req.header(GlobalConstants.USER_HEADER);
        const updatedBooking = await this.bookingService.updateBooking(uuid, booking);

        return res.status(HttpStatus.OK).json(updatedBooking);
    }

    @Delete('/booking/:bookingId')
    public async deleteBooking(
        @Req() req: Request,
        @Res() res: Response,
        @Param('bookingId') uuid: string
    ): Promise<Response> {
        const booking = await this.bookingService.deleteBooking(uuid);

        return res.status(HttpStatus.OK).json(booking);
    }
}
