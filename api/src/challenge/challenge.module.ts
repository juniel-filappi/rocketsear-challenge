import { Module } from '@nestjs/common';
import { ChallengeResolver } from './challenge.resolver';
import { ChallengeService } from './challenge.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Env } from '../env';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CORRECTIONS_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService<Env>) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('KAFKA_CLIENT_ID'),
              brokers: [configService.get('KAFKA_BROKERS')],
            },
            consumer: {
              groupId: configService.get('KAFKA_CONSUMER_GROUP_ID'),
            },
          },
        }),
      },
    ]),
    PrismaModule,
  ],
  providers: [ChallengeResolver, ChallengeService],
})
export class ChallengeModule {}
