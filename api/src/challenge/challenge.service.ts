import { Injectable } from '@nestjs/common';
import { ChallengeArgs } from './dto/challenge-args.dto';
import { Challenge } from './challenge.model';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallengeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(args: ChallengeArgs): Promise<Challenge[]> {
    const { skip = 0, take = 25, title, description } = args;

    const where = {
      title: {
        contains: title,
      },
      description: {
        contains: description,
      },
    };

    return this.prisma.challenge.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Challenge> {
    return this.prisma.challenge.findUnique({
      where: { id },
    });
  }

  async createChallenge(data: CreateChallengeInput): Promise<Challenge> {
    return this.prisma.challenge.create({ data });
  }

  async updateChallenge(data: UpdateChallengeInput): Promise<Challenge> {
    const { id, ...updateData } = data;
    return this.prisma.challenge.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteChallenge(id: string): Promise<Challenge> {
    return this.prisma.challenge.delete({
      where: { id },
    });
  }
}
