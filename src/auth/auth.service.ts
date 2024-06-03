import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
import { TokensType } from '../types';

@Injectable()
export class AuthService {
    public static readonly EXPIRE_DAY_REFRESH_TOKEN = 1;
    public static readonly REFRESH_TOKEN_NAME = 'refreshToken';

    constructor(
        private jwt: JwtService,
        private readonly accountsService: AccountsService
    ) {}

    async tryLogin(dto: AuthDto) {
        const account = await this.accountsService.validate(dto.login, dto.password);

        const tokens = this.issueTokens(account.id);

        return {
            ...account,
            ...tokens
        };
    }

    async tryRegister(dto: AuthDto) {
        const account = await this.accountsService.create(dto);

        const tokens = this.issueTokens(account.id);

        return {
            ...account,
            ...tokens
        };
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken);

        if (!result) {
            throw new UnauthorizedException('Ошибка при верификации refresh-токена');
        }

        const account = await this.accountsService.findOneById(result.id);

        const tokens = this.issueTokens(account.id);

        return {
            ...account,
            ...tokens
        };
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + AuthService.EXPIRE_DAY_REFRESH_TOKEN);

        res.cookie(AuthService.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            expires: expiresIn,
            secure: true,
            sameSite: 'none'
        });
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(AuthService.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: process.env.DOMAIN,
            expires: new Date(0),
            secure: true,
            sameSite: 'none'
        });
    }

    private issueTokens(id: number) {
        const data = { id };

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        });

        return { accessToken, refreshToken } as TokensType;
    }
}
