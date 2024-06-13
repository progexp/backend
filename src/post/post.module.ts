import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { AccountsService } from '../accounts/accounts.service';
import { postProviders } from './post.providers';
import { DatabaseModule } from '../database/database.module';
import { accountsProviders } from '../accounts/accounts.providers';
import { PostService } from './post.service';
import { AppModule } from '../app.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
    imports: [DatabaseModule, AccountsModule],
    controllers: [PostController],
    providers: [PostService, ...postProviders]
})
export class PostModule {}
