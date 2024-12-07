import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class SubmissionArgs {
  @Field((type) => Int)
  @Min(0)
  skip = 0;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field((type) => String, { nullable: true })
  challengeId?: string;

  @Field((type) => String, { nullable: true })
  status?: string;

  @Field((type) => Date, { nullable: true })
  startDate?: Date;

  @Field((type) => Date, { nullable: true })
  endDate?: Date;
}
