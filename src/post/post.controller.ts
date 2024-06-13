import {
    Body,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @HttpCode(200)
    @Get()
    public async getAll() {
        return await this.postService.getAll();
    }

    @HttpCode(200)
    @Get(':id')
    public async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.postService.getById(id);
    }

    @Post()
    public async create(@Body() dto: PostDto) {
        console.log(dto);
        return this.postService.create(dto);
    }

    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/posts/uploads/images',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);

                    callback(null, `${uniqueSuffix}${ext}`);
                }
            })
        })
    )
    @HttpCode(200)
    @Post('upload')
    public async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return file.path;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() dto: PostDto) {
        return this.postService.update(id, dto);
    }
}
