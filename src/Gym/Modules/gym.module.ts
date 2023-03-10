import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../Logger/Modules/logger.module';
import { GymController } from '../Controllers/gym.controller';
import { Gym } from '../Entities/gym.entity';
import { GymService } from '../Services/gym.service';

@Module({
    imports: [TypeOrmModule.forFeature([Gym]), LoggerModule],
    controllers: [GymController],
    providers: [GymService],
    exports: [GymService]
})
export class GymModule {}
