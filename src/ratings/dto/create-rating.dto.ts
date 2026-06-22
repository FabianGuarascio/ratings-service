export class CreateRatingDto {
  movieId!: number;
  score!: number;
  userId?: string;
  comment?: string;
}
