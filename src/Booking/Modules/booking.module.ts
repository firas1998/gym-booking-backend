import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymModule } from 'src/Gym/Modules/gym.module';
import { UserModule } from 'src/User/Modules/user.module';
import { LoggerModule } from '../../Logger/Modules/logger.module';
import { AuthorizationModule } from '../../Authorization/Modules/authorization.module';
import { BookingController } from '../Controllers/booking.controller';
import { Booking } from '../Entities/booking.entity';
import { BookingService } from '../Services/booking.service';

@Module({
    imports: [TypeOrmModule.forFeature([Booking]), LoggerModule, UserModule, GymModule],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService]
})
export class BookingModule {}
