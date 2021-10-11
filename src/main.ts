import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { AppModule } from './app.module';
import { LoggerService } from './Logger/Services/logger.service';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { GlobalConstants } from './GlobalConstants';

const microServiceOptions = {
    transport: Transport.RMQ,
    options: {
        urls: [
            `${process.env.RMQ_PROTOCOL}://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`
        ],
        queue: process.env.MICROSERVICE_NAME,
        queueOptions: {
            durable: true
        }
    }
} as MicroserviceOptions;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>(microServiceOptions);
    app.useLogger(app.get(LoggerService));
    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        })
    );
    app.startAllMicroservicesAsync();
    app.listen(Number(process.env.PORT), () => {
        Logger.log(`${GlobalConstants.MICROSERVICE_NAME} is listening...`);
    });
}
bootstrap();
