import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Submission } from './submission.model';
import { SubmissionService } from './submission.service';
import { SubmissionArgs } from './dto/submission-args.dto';
import { CreateSubmissionInput } from './dto/create-submission.input';

@Resolver((of) => Submission)
export class SubmissionResolver {
  constructor(private readonly service: SubmissionService) {}

  @Query((returns) => [Submission])
  async submissions(@Args() args: SubmissionArgs) {
    return this.service.findAllSubmissions(args);
  }

  @Query((returns) => Submission)
  async submission(@Args('id') id: string) {
    return this.service.findSubmission(id);
  }

  @Mutation((returns) => Submission)
  async createSubmission(@Args('data') data: CreateSubmissionInput) {
    return this.service.createSubmission(data);
  }
}
