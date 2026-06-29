import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller()
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @MessagePattern('createRating')
  create(@Payload() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @MessagePattern('findAllRatings')
  findAll() {
    return this.ratingsService.findAll();
  }

  @MessagePattern('findOneRating')
  findOne(@Payload() id: number) {
    return this.ratingsService.findOne(+id);
  }

  @MessagePattern('updateRating')
  update(@Payload() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(updateRatingDto.id, updateRatingDto);
  }

  @MessagePattern('removeRating')
  remove(@Payload() id: number) {
    return this.ratingsService.remove(+id);
  }
}
