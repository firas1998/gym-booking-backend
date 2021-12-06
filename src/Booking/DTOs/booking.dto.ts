import { ApiProperty } from "@nestjs/swagger";

export class BookingDTO {
    userId?: string;
    @ApiProperty({
        description: 'gymId',
        type: String,
        required: true
    })
    gymId?: string;
    @ApiProperty({
        description: 'booking date and time',
        type: String,
        example: 'YYYY-MM-DD HH:mm:ss ZZ',
        required: true
    })
    datetime?: string;
}
