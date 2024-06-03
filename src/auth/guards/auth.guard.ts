import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        const refreshToken = request.cookies?.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh-токен не найден');
        }

        try {
            request.user = await this.jwtService.verifyAsync(refreshToken);
            return true;
        } catch (error) {
            throw new UnauthorizedException(`Ошибка при верификации refresh-токена`);
        }
    }
}
