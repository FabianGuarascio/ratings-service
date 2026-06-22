import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller()
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
  ) {}

  private async safe<T>(
    pattern: string,
    payload: unknown,
    fn: () => Promise<T>,
  ): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      this.kafkaClient.emit('ratings.error', {
        pattern,
        payload,
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
      });
      throw err;
    }
  }

  @MessagePattern('createRating')
  create(@Payload() createRatingDto: CreateRatingDto) {
    return this.safe('createRating', createRatingDto, () =>
      this.ratingsService.create(createRatingDto),
    );
  }

  @MessagePattern('findAllRatings')
  findAll() {
    return this.safe('findAllRatings', {}, () => this.ratingsService.findAll());
  }

  @MessagePattern('findOneRating')
  findOne(@Payload() id: number) {
    return this.safe('findOneRating', id, () =>
      this.ratingsService.findOne(+id),
    );
  }

  @MessagePattern('updateRating')
  update(@Payload() updateRatingDto: UpdateRatingDto) {
    return this.safe('updateRating', updateRatingDto, () =>
      this.ratingsService.update(updateRatingDto.id, updateRatingDto),
    );
  }

  @MessagePattern('removeRating')
  remove(@Payload() id: number) {
    return this.safe('removeRating', id, () => this.ratingsService.remove(+id));
  }
}
