import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SubmissionService } from './submission.service';
import { PrismaService } from '../prisma/prisma.service';
import { SubmissionResolver } from './submission.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CORRECTIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'challenge',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'challenge-consumer',
          },
        },
      },
    ]),
  ],
  providers: [SubmissionService, PrismaService, SubmissionResolver],
  exports: [SubmissionService],
})
export class SubmissionModule {}
