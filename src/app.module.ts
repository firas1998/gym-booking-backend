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

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forRoot(),
        GuardModule,
        LoggerModule,
        UserModule,
        GymModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserUuidMiddleware).forRoutes('/');
    }
}
