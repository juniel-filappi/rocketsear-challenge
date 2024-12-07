import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubmissionInput {
  @Field((type) => String)
  challengeId: string;

  @Field((type) => String)
  repositoryUrl: string;
}
