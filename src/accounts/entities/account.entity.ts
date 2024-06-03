import { Table, Column, Index, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'accounts', timestamps: false })
export class Account extends Model {
    @Index
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id!: number;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    login!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Index
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    role!: number;

    @Column({
        type: DataType.INET,
        allowNull: false
    })
    lastLoginIp!: string;

    @Column({
        type: DataType.INET,
        allowNull: false
    })
    registrationIp!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    lastLoginDate!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    registrationDate!: Date;
}
