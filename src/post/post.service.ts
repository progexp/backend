import { Inject, Injectable } from '@nestjs/common';
import { Providers } from '../enums/providers';
import { Post } from './entities/post.entity';
import { normalizeFilePath } from '../utils';
import { AccountsService } from '../accounts/accounts.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        @Inject(Providers.Posts) private readonly postsRepository: typeof Post,
        private accountsService: AccountsService
    ) {}

    async create(dto: PostDto) {
        const post = await this.postsRepository.create({
            ...dto
        });

        return this.getDto(post);
    }

    async update(id: number, dto: PostDto) {
        const post = await this.postsRepository.update(
            {
                ...dto,
                files: dto.files.map((file) => normalizeFilePath(file))
            },
            { where: { id } }
        );

        return this.getDto(post);
    }

    async getAll() {
        try {
            return await this.postsRepository.findAll();
        } catch (error) {
            console.error(`Произошла ошибка. Подробнее: ${error.message}`);
        }
    }

    async getById(id: number) {
        try {
            return await this.postsRepository.findOne({
                where: { id }
            });
        } catch (error) {
            console.error(`Произошла ошибка. Подробнее: ${error.message}`);
        }
    }

    private getDto(post: any, authorLogin?: string) {
        return {
            id: post.id,
            title: post.title,
            description: post.description,
            files: post?.files,
            author: authorLogin ?? post.author,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        } as unknown as Post;
    }
}
