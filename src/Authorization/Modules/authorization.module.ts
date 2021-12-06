import { Module, Global, forwardRef } from '@nestjs/common';
import { BookingModule } from 'src/Booking/Modules/booking.module';
import { AuthorizationService } from '../Services/authorization.service';

@Global()
@Module({
    imports: [BookingModule],
    providers: [AuthorizationService],
    exports: [AuthorizationService]
})
export class AuthorizationModule {}
