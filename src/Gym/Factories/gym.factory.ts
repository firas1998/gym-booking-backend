import { define } from 'typeorm-seeding';
import Faker, { datatype } from 'faker';
import { Gym } from '../Entities/gym.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
define(Gym, (faker: typeof Faker) => {
    const gym = new Gym();

    gym.id = datatype.number();
    gym.uuid = datatype.uuid();
    gym.name = datatype.string(10);
    gym.address = datatype.string(10);
    gym.maxVisitors = datatype.number(10);

    return gym;
});
