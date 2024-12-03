import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: process.env.ENV === 'dev',
      context: ({ req }) => ({ request: req }),
    }),
    ChallengeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
