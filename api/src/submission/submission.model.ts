import { Challenge } from '../challenge/challenge.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export enum ESubmissionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

@ObjectType()
export class Submission {
  @Field((type) => ID)
  id: string;

  @Field((type) => Number)
  challengeId: string;

  @Field((type) => Number)
  note: number;

  @Field((type) => String)
  status: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Challenge, { nullable: true })
  challenge?: Challenge;
}
