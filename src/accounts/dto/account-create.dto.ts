import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AccountCreateDto {
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
