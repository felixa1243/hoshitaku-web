import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'users'})
export class UsersEntity {
    @PrimaryColumn()
    email: string
    @Column({name: 'password'})
    password: string
    @Column({name: 'created_at', default: () => "CURRENT_DATE", type: "date"})
    createdAt: Date
    @Column({name: 'updated_at', nullable: true})
    updatedAt: Date
}