import { User } from '../../User/Entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Gym } from 'src/Gym/Entites/gym.entity';

@Entity({ name: 'bookings' })
export class Booking {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, nullable: false })
    @Generated('uuid')
    uuid: string;

    @ManyToOne(() => User, (user) => user.bookingsCreated, {
        eager: true,
        cascade: true,
        nullable: false
    })
    creator: User;

    @ManyToOne(() => Gym, (gym) => gym.bookings, {
        eager: true,
        cascade: true,
        nullable: false
    })
    gym: Gym;

    @Column({ type: 'timestamptz', nullable: false })
    time: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;
}
