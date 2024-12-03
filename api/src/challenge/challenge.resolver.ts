import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Challenge } from './models/challenge.model';
import { ChallengeArgs } from './dto/challenge-args.dto';
import { ChallengeService } from './challenge.service';

@Resolver((of) => Challenge)
export class ChallengeResolver {
  constructor(private readonly service: ChallengeService) {}

  @Query((returns) => [Challenge])
  async challenges(@Args() args: ChallengeArgs): Promise<Challenge[]> {
    return this.service.findAll(args);
  }

  @Mutation((returns) => Challenge)
  async createChallenge(@Args('title') title: string): Promise<Challenge> {
    return this.service.createChallenge(title);
  }
}
