import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Gym } from '../Entities/gym.entity';

export class CreateGym implements Seeder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Gym)().createMany(10);
    }
}
