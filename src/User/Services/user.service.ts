import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../DTOs/user.dto';
import { User } from '../Entities/user.entity';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    /**
     *
     *
     * @param {string} uuid
     * @returns {Promise<User>}
     * @memberof UserService
     */
    public async getUser(uuid: string): Promise<User> {
        const user = await this.getUserByUuid(uuid);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    /**
     *
     *
     * @param {UserDTO} user
     * @returns {Promise<User>}
     * @memberof UserService
     */
    public async createUser(user: UserDTO): Promise<User> {
        const oldUserUuid = await this.getUserByUuid(user.uuid);
        if (oldUserUuid) {
            throw new HttpException(
                'User already exists',
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        const newUser = await this.userRepository.save(user);

        if (newUser) {
            return newUser;
        }

        throw new HttpException(
            'User could not be created',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    /**
     *
     *
     * @private
     * @param {string} uuid
     * @returns {Promise<User>}
     * @memberof UserService
     */
    private async getUserByUuid(uuid: string): Promise<User> {
        return this.userRepository.findOne({ uuid: uuid });
    }
}
