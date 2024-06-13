import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [ConfigModule.forRoot(), AccountsModule, AuthModule, PostModule]
})
export class AppModule {}
