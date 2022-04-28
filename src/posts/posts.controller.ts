import { isEmpty } from './../utils/is-empty-object';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from './../auth/current-user.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostQueryDto } from './dto/query.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() currentUser, @Body() createPostDto: CreatePostDto) {
    const categories = createPostDto.categories?.map((category) => {
      return {
        id: category,
      };
    });

    return this.postsService.create({
      ...createPostDto,
      author: {
        connect: {
          id: currentUser.id, 
        },
      },
      categories: {
        connect: categories,
      },
    });
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories?.map((category) => {
      return {
        id: category,
      };
    });

    // remove all the old categories and update by using set
    return this.postsService.update(id, {
      ...updatePostDto,
      categories: {
        set: categories,
      },
    });
  }

  @Get()
  findAll(@Query() query?: PostQueryDto) {
    return this.postsService.findAll(isEmpty(query) ? null : query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
