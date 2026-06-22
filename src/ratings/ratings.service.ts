import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from '../prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async create(createRatingDto: CreateRatingDto) {
    const rating = await this.prisma.rating.create({ data: createRatingDto });
    this.kafkaClient.emit('rating.added', {
      movieId: rating.movieId,
      score: rating.score,
    });
    return rating;
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
