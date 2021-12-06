import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from '../Entities/gym.entity';

@Injectable()
export class GymService {
    public constructor(
        @InjectRepository(Gym)
        private readonly gymRepository: Repository<Gym>
    ) { }

    /**
     *
     *
     * @returns {Promise<Gym[]>}
     * @memberof GymService
     */
    public async getAllGyms(): Promise<Gym[]> {
        const gyms = await this.gymRepository.find();

        return gyms;
    }

    /**
     *
     *
     * @param {string} uuid
     * @returns {Promise<Gym>}
     * @memberof GymService
     */
    public async getGym(uuid: string): Promise<Gym> {
        const gym = await this.getGymByUuid(uuid);

        if (!gym) {
            throw new HttpException('Gym not found', HttpStatus.NOT_FOUND);
        }

        return gym;
    }

    /**
     *
     *
     * @private
     * @param {string} uuid
     * @returns {Promise<User>}
     * @memberof UserService
     */
    private async getGymByUuid(uuid: string): Promise<Gym> {
        return this.gymRepository.findOne({ uuid: uuid }, { relations: ['bookings'] });
    }
}
