import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UseFilters,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import { LoggerService } from '../../Logger/Services/logger.service';
import { Response, Request } from 'express';
import { UserService } from '../Services/user.service';
import { UserDTO } from '../DTOs/user.dto';
import { HttpExceptionFilter } from '../../Exceptions/Filters/http.exception.filter';
import { CreateUserValidationSchema } from '../Validation/create-user.validation-schema';
import { ValidationPipe } from '../../Pipes/validation.pipe';
import { PipeType } from '../../Pipes/Enums/type.enum';
import { GlobalConstants } from '../../GlobalConstants';
import { LoggerInterceptor } from '../../Interceptors/logger.interceptor';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggerInterceptor)
@Controller('/user')
export class UserController {
    public constructor(
        private loggerService: LoggerService,
        private readonly userService: UserService
    ) {
        this.loggerService.setContext(this.constructor.name);
    }

    @Get('/')
    public async getUser(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<Response> {
        const user = await this.userService.getUser(
            req.header(GlobalConstants.USER_HEADER)
        );

        return res.status(HttpStatus.OK).json(user);
    }

    @UsePipes(new ValidationPipe(CreateUserValidationSchema, PipeType.HTTP))
    @Post('/create')
    public async createUser(
        @Req() req: Request,
        @Res() res: Response,
        @Body() userDTO: UserDTO
    ): Promise<Response> {
        const user = userDTO;
        user.uuid = req.header(GlobalConstants.USER_HEADER);
        const isUserCreated = await this.userService.createUser(user);

        return res.status(HttpStatus.OK).json(isUserCreated);
    }
}
