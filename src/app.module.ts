import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardModule } from './Authentication/Modules/authentication.module';
import { LoggerModule } from './Logger/Modules/logger.module';
import { UserUuidMiddleware } from './Middleware/user-uuid.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/Modules/user.module';
import { GymModule } from './Gym/Modules/gym.module';
import { BookingModule } from './Booking/Modules/booking.module';
import { AuthorizationModule } from './Authorization/Modules/authorization.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'public/dist')
        }),
        ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [process.env.TYPEORM_ENTITIES],
            synchronize: true,
            ssl:
                process.env.NODE_ENV === 'production'
                    ? { rejectUnauthorized: false }
                    : false
        }),
        AuthorizationModule,
        GuardModule,
        LoggerModule,
        UserModule,
        GymModule,
        BookingModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserUuidMiddleware).forRoutes('/');
    }
}
