import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRatingDto: CreateRatingDto) {
    return this.prisma.rating.create({ data: createRatingDto });
  }

  findAll() {
    return this.prisma.rating.findMany();
  }

  findOne(id: number) {
    return this.prisma.rating.findUnique({ where: { id } });
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return this.prisma.rating.update({ where: { id }, data: updateRatingDto });
  }

  remove(id: number) {
    return this.prisma.rating.delete({ where: { id } });
  }
}
