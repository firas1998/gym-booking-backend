import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Req,
    Res,
    UseFilters,
    UseInterceptors
} from '@nestjs/common';
import { LoggerService } from '../../Logger/Services/logger.service';
import { Response, Request } from 'express';
import { HttpExceptionFilter } from '../../Exceptions/Filters/http.exception.filter';
import { LoggerInterceptor } from '../../Interceptors/logger.interceptor';
import { GymService } from '../Services/gym.service';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggerInterceptor)
@Controller('/gym')
export class GymController {
    public constructor(
        private loggerService: LoggerService,
        private readonly gymService: GymService
    ) {
        this.loggerService.setContext(this.constructor.name);
    }

    @Get('/')
    public async getUser(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<Response> {
        const gyms = await this.gymService.getAllGyms();

        return res.status(HttpStatus.OK).json(gyms);
    }

    @Get('/:id')
    public async createUser(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') uuid: string
    ): Promise<Response> {
        const gym = await this.gymService.getGym(uuid);

        return res.status(HttpStatus.OK).json(gym);
    }
}
