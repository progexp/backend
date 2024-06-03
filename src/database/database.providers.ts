import { Sequelize } from 'sequelize-typescript';
import { Account } from '../accounts/entities/account.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS,
                database: process.env.DATABASE_NAME,
                logging: false,
                sync: { alter: false }
            });

            sequelize.addModels([Account]);
            await sequelize.sync();
            return sequelize;
        }
    }
];
