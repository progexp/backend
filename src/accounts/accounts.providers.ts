import { Account } from './entities/account.entity';
import { Providers } from '../enums/providers';

export const accountsProviders = [
    {
        provide: Providers.Accounts,
        useValue: Account
    }
];
