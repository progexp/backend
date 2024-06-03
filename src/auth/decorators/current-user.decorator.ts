import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from '../../accounts/entities/account.entity';

export const CurrentUser = createParamDecorator((data: keyof Account, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
});
