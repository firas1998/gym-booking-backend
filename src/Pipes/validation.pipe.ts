import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';
import { PipeType } from './Enums/type.enum';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(
        private schema: ObjectSchema,
        private readonly pipeType: PipeType
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: any, _metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            switch (this.pipeType) {
                case PipeType.HTTP:
                    throw new HttpException(
                        error.message,
                        HttpStatus.BAD_REQUEST
                    );
                case PipeType.RPC:
                    throw new HttpException(
                        error.message,
                        HttpStatus.BAD_REQUEST
                    );
                    break;
            }
        }
        return value;
    }
}
