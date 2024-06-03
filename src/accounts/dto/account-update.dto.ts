import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength
} from 'class-validator';

export class AccountUpdateDto {
    @IsOptional()
    @IsString({
        message: 'Логин должен быть только строчкой'
    })
    @MinLength(3, {
        message: 'Логин не может быть короче 3 символов'
    })
    @MaxLength(20, {
        message: 'Логин не может быть больше 20 символов'
    })
    login: string;

    @IsOptional()
    @IsString({
        message: 'Пароль должен быть только строчкой'
    })
    @MinLength(6, {
        message: 'Пароль не может быть короче 6 символов'
    })
    @MaxLength(30, {
        message: 'Пароль не может быть больше 30 символов'
    })
    password: string;

    @IsOptional()
    @IsNumber(null, {
        message: 'Роль должна быть числом'
    })
    @Min(0, {
        message: 'Роль не может быть меньше 0'
    })
    role: number;

    @IsOptional()
    @IsString({
        message: 'Последний IP должен быть только строчкой'
    })
    @MinLength(7, {
        message: 'Последний IP не может быть короче 7 символов'
    })
    @MaxLength(15, {
        message: 'Последний IP не может быть больше 15 символов'
    })
    lastLoginIp: string;

    @IsOptional()
    @IsString({
        message: 'Дата последнего входа должна быть только строчкой'
    })
    @MinLength(5, {
        message: 'Дата последнего входа не может быть короче 5 символов'
    })
    @MaxLength(25, {
        message: 'Дата последнего входа не может быть больше 25 символов'
    })
    lastLoginDate: Date;

    @IsOptional()
    @IsEmail(undefined, {
        message: 'Электронная почта должна быть только строчкой'
    })
    @MinLength(5, {
        message: 'Электронная почта не может быть короче 5 символов'
    })
    @MaxLength(25, {
        message: 'Электронная почта не может быть больше 25 символов'
    })
    email: string;
}
