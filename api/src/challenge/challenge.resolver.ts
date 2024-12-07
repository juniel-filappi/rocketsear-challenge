import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Challenge } from './challenge.model';
import { ChallengeArgs } from './dto/challenge-args.dto';
import { ChallengeService } from './challenge.service';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';

@Resolver((of) => Challenge)
export class ChallengeResolver {
  constructor(private readonly service: ChallengeService) {}

  @Query((returns) => [Challenge])
  async challenges(@Args() args: ChallengeArgs): Promise<Challenge[]> {
    return this.service.findAll(args);
  }

  @Query((returns) => Challenge)
  async challenge(@Args('id') id: string): Promise<Challenge> {
    return this.service.findOne(id);
  }

  @Mutation((returns) => Challenge)
  async createChallenge(@Args('data') data: CreateChallengeInput) {
    return this.service.createChallenge(data);
  }

  @Mutation((returns) => Challenge)
  async updateChallenge(
    @Args('data') data: UpdateChallengeInput,
  ): Promise<Challenge> {
    return this.service.updateChallenge(data);
  }

  @Mutation((returns) => Challenge)
  async deleteChallenge(@Args('id') id: string): Promise<Challenge> {
    return this.service.deleteChallenge(id);
  }
}
