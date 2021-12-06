import { ApiProperty } from "@nestjs/swagger";
import { Gender } from '../Enums/gender.enum';

export class UserDTO {
    uuid?: string;
    @ApiProperty({
        description: 'first name',
        type: String,
        required: true
    })
    firstName?: string;
    @ApiProperty({
        description: 'last name',
        type: String,
        required: true
    })
    lastName?: string;
    @ApiProperty({
        description: 'date of birth',
        type: String,
        example: 'YYYY-MM-DD',
        required: true
    })
    dateOfBirth?: Date;
    @ApiProperty({
        description: 'gender',
        enum: Gender,
        required: true
    })
    gender?: Gender;
}
