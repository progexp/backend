import { IsString, MaxLength, MinLength } from 'class-validator';

export class PostDto {
    @IsString()
    @MinLength(6, {
        message: 'Заголовок не может быть меньше 6 символов'
    })
    @MaxLength(20, {
        message: 'Заголовок не может быть больше 20 символов'
    })
    title: string;

    @IsString()
    @MinLength(12, {
        message: 'Описание не может быть меньше 12 символов'
    })
    @MaxLength(50000, {
        message: 'Описание не может быть больше 50000 символов'
    })
    description: string;

    userId: number;
    files: string[];
}
