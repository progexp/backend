import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from '../database/database.module';
import { accountsProviders } from './accounts.providers';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../auth/jwt/jwt.config';
import { Providers } from '../enums/providers';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.registerAsync({
            useFactory: getJwtConfig
        })
    ],
    controllers: [AccountsController],
    providers: [AccountsService, ...accountsProviders],
    exports: [AccountsService, Providers.Accounts]
})
export class AccountsModule {}
