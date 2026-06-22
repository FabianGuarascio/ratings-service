import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ratings-service-producer',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [RatingsController],
  providers: [RatingsService, PrismaService],
})
export class RatingsModule {}
