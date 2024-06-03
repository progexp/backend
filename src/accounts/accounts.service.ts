import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { Providers } from '../enums/providers';
import { AccountCreateDto } from './dto/account-create.dto';
import { AccountUpdateDto } from './dto/account-update.dto';

@Injectable()
export class AccountsService {
    constructor(
        @Inject(Providers.Accounts)
        private accountsRepository: typeof Account
    ) {}

    async create(dto: AccountCreateDto) {
        const account = await this.accountsRepository.create({
            login: dto.login,
            password: dto.password,
            email: dto.email,
            role: 0,
            lastLoginIp: '127.0.0.1',
            registrationIp: '127.0.0.1'
        });

        const { password, ...accountWithoutPassword } = account.get({ plain: true });
        return accountWithoutPassword;
    }

    async findAll() {
        const accounts = await this.accountsRepository.findAll<Account>();

        if (!accounts || accounts.length === 0) {
            throw new NotFoundException('Не найдено действующих аккаунтов');
        }

        return accounts.map((account) => {
            const { password, ...accountWithoutPassword } = account.get({ plain: true });
            return accountWithoutPassword;
        });
    }

    async findOneById(id: number) {
        const account = await this.accountsRepository.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException(`Аккаунт #${id} не найден в базе данных`);
        }

        const { password, ...accountWithoutPassword } = account.get({ plain: true });
        return accountWithoutPassword;
    }

    async validate(login: string, password: string) {
        const account = await this.accountsRepository.findOne({ where: { login, password } });

        if (!account) {
            throw new NotFoundException(`Неверный логин или пароль`);
        }

        const { password: _password, ...accountWithoutPassword } = account.get({ plain: true });
        return accountWithoutPassword;
    }

    async update(id: number, dto: AccountUpdateDto) {
        const account = await this.findOneById(id);

        if (!account) {
            throw new NotFoundException(`Аккаунт #${id} не найден в базе данных`);
        }

        return await this.accountsRepository.update(
            {
                ...dto
                // login: dto.login ?? account.login,
                // password: dto.password,
                // role: dto.role ?? account.role,
                // lastLoginIp: dto.lastLoginIp ?? account.lastLoginIp,
                // lastLoginDate: dto.lastLoginDate ?? account.lastLoginDate,
                // email: dto.email ?? account.email
            },
            { where: { id } }
        );
    }

    async remove(id: number) {
        return await this.accountsRepository.destroy({
            where: { id }
        });
    }
}
