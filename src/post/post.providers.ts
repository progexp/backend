import { Providers } from '../enums/providers';
import { Post } from './entities/post.entity';

export const postProviders = [
    {
        provide: Providers.Posts,
        useValue: Post
    }
];
