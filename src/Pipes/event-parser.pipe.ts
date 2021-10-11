import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class EventParserPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: string, _metadata: ArgumentMetadata) {
        return JSON.parse(value);
    }
}
