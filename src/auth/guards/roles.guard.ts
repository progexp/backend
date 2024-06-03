import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from '../../accounts/accounts.service';
import { Role } from '@shared/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly accountsService: AccountsService
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const userId = request.user.id;

        const account = await this.accountsService.findOneById(userId);

        if (!account || requiredRoles.every((role) => account.role < role)) {
            throw new UnauthorizedException('У вас нет прав для использования этого ресурса');
        }

        return true;
    }
}
