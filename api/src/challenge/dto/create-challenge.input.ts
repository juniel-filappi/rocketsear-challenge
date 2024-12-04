import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateChallengeInput {
  @Field()
  @MinLength(1)
  title: string;

  @Field()
  @MinLength(1)
  description: string;
}
