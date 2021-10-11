import { Booking } from 'src/Booking/Entities/booking.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'gyms' })
export class Gym {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    uuid: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 100 })
    address: string;

    @Column()
    maxVisitors: number;

    @OneToMany(() => Booking, (booking) => booking.creator)
    bookings: Booking[];

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;
}
