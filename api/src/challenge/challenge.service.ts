import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ChallengeArgs } from './dto/challenge-args.dto';
import { Challenge } from './challenge.model';
import { ClientKafka } from '@nestjs/microservices';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallengeService implements OnModuleInit {
  constructor(
    @Inject('CORRECTIONS_SERVICE') private client: ClientKafka,
    private readonly service: PrismaService,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('challenge.correction');
    await this.client.connect();
  }

  async findAll(args: ChallengeArgs): Promise<Challenge[]> {
    return this.service.challenge.findMany();
  }

  async createChallenge(data: CreateChallengeInput): Promise<Challenge> {
    this.client
      .send(
        'challenge.correction',
        JSON.stringify({ submissionId: 1, repositoryUrl: 'https://github.com' }),
      )
      .subscribe();

    return this.service.challenge.create({ data });
  }
}
