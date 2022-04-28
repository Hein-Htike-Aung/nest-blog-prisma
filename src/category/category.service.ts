import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll(query: Prisma.CategoryInclude) {
    return this.prisma.category.findMany({include: query});
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
