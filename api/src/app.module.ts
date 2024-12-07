import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChallengeModule } from './challenge/challenge.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { PrismaModule } from './prisma/prisma.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: process.env.ENV === 'dev',
      context: ({ request }) => ({ request }),
    }),
    ChallengeModule,
    PrismaModule,
    SubmissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
