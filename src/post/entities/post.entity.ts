import { Table, Column, Index, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'posts', timestamps: true })
export class Post extends Model {
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
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    imageUrl!: string;

    @Index
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;
}
