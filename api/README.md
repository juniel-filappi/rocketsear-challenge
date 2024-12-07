# Backend Challenge API

This is a NestJS-based API that uses GraphQL, Prisma, and Kafka for message processing.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- Yarn package manager
- Docker and Docker Compose (for running Kafka and database services)

## Installation

1. Clone the repository and navigate to the api directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your specific configuration.

4. Set up the database with Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Running the Application

### Development Mode
To run the application in development mode with hot-reload:
```bash
yarn start:dev
```

### Production Mode
To build and run the application in production mode:
```bash
yarn build
yarn start:prod
```

### Testing
Run the test suite:
```bash
# Unit tests
yarn test

# e2e tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Available Scripts

- `yarn build`: Build the application
- `yarn format`: Format code using Prettier
- `yarn start`: Start the application
- `yarn start:dev`: Start in development mode with hot-reload
- `yarn start:debug`: Start in debug mode
- `yarn start:prod`: Start in production mode
- `yarn lint`: Lint the code
- `yarn test`: Run tests
- `yarn test:watch`: Run tests in watch mode
- `yarn test:cov`: Run tests with coverage
- `yarn test:debug`: Debug tests
- `yarn test:e2e`: Run end-to-end tests

## Project Structure

- `src/`: Source code directory
- `prisma/`: Database schema and migrations
- `test/`: Test files
- `dist/`: Compiled JavaScript files

## Technologies Used

- NestJS
- GraphQL (Apollo Server)
- Prisma (Database ORM)
- Kafka (Message Queue)
- TypeScript
- Jest (Testing)
- ESLint & Prettier (Code Quality)

## API Documentation

After starting the application, you can access the GraphQL Playground at:
```
http://localhost:3000/graphql
```

Here you can explore the API schema and test queries/mutations.
