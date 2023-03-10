import { Booking } from 'src/Booking/Entities/booking.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Gender } from '../Enums/gender.enum';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    uuid: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @OneToMany(() => Booking, (booking) => booking.creator, { eager: true })
    bookingsCreated: Booking[];

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;
}
