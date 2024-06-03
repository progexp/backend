import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsService } from '../accounts/accounts.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { accountsProviders } from '../accounts/accounts.providers';
import { getJwtConfig } from './jwt/jwt.config';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: getJwtConfig
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AccountsService, ...accountsProviders]
})
export class AuthModule {}
