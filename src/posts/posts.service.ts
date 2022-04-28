import { PostQueryDto } from './dto/query.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data: createPostDto });
  }

  findAll(query: Prisma.PostInclude) {
    return this.prisma.post.findMany({ include: query });
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ where: { id }, data: updatePostDto });
  }

  remove(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
