import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './Logger/Services/logger.service';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { GlobalConstants } from './GlobalConstants';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
    app.useLogger(new LoggerService());
    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        })
    );

    const config = new DocumentBuilder()
        .setTitle('gym booking')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.enableCors();
    app.listen(Number(process.env.PORT), () => {
        Logger.log(`booking is listening...`);
    });
}
bootstrap();
