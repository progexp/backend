import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountCreateDto } from './dto/account-create.dto';
import { AccountUpdateDto } from './dto/account-update.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '@shared/enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@CurrentUser('id') id: number) {
        console.log('this.accountsService.findOneById(id)');
        return this.accountsService.findOneById(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Administrator)
    @Post()
    async create(@Body() dto: AccountCreateDto) {
        return this.accountsService.create(dto);
    }

    @Get()
    findAll() {
        return this.accountsService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this.accountsService.findOneById(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Moderator)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: AccountUpdateDto) {
        return this.accountsService.update(id, dto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Moderator)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.accountsService.remove(id);
    }
}
