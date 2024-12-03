import { Injectable } from '@nestjs/common';
import { ChallengeArgs } from './dto/challenge-args.dto';
import { Challenge } from './models/challenge.model';

@Injectable()
export class ChallengeService {
  async findAll(args: ChallengeArgs): Promise<Challenge[]> {
    return [] as Challenge[];
  }

  async createChallenge(title: string): Promise<Challenge> {
    return {} as Challenge;
  }
}
