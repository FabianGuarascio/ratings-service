import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [RatingsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
