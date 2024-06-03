import { Controller, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.tryLogin(dto);
        this.authService.addRefreshTokenToResponse(res, refreshToken);

        return response;
    }

    @Post('register')
    async register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.tryRegister(dto);
        this.authService.addRefreshTokenToResponse(res, refreshToken);

        return response;
    }

    @Post('access-token')
    async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshTokenFromCookies = req.cookies[AuthService.REFRESH_TOKEN_NAME];

        if (!refreshTokenFromCookies) {
            this.authService.removeRefreshTokenFromResponse(res);
            throw new UnauthorizedException('Ошибка при верификации refresh-токена');
        }

        const { refreshToken, ...response } =
            await this.authService.getNewTokens(refreshTokenFromCookies);

        this.authService.addRefreshTokenToResponse(res, refreshToken);

        return response;
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        this.authService.removeRefreshTokenFromResponse(res);
        return true;
    }
}
