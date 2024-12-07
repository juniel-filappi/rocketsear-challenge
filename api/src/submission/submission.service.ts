import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { ESubmissionStatus } from './submission.model';
import { SubmissionArgs } from './dto/submission-args.dto';

@Injectable()
export class SubmissionService implements OnModuleInit {
  constructor(
    @Inject('CORRECTIONS_SERVICE') private client: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('challenge.correction');
    await this.client.connect();
  }

  async findAllSubmissions(args: SubmissionArgs) {
    const {
      skip = 0,
      take = 25,
      challengeId,
      status,
      startDate,
      endDate,
    } = args;

    const where: any = {};

    if (challengeId) {
      where.challengeId = challengeId;
    }

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    return this.prisma.submission.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { challenge: true },
    });
  }

  async createSubmission(data: CreateSubmissionInput) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: data.challengeId },
    });

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    const submission = await this.prisma.submission.create({
      data: {
        challengeId: data.challengeId,
        status: ESubmissionStatus.PENDING,
        repositoryUrl: data.repositoryUrl,
        note: 0,
      },
      include: {
        challenge: true,
      },
    });

    this.client.emit('challenge.correction', {
      submissionId: submission.id,
      repositoryUrl: data.repositoryUrl,
    });

    return submission;
  }

  async findSubmission(id: string) {
    return this.prisma.submission.findUnique({
      where: { id },
      include: { challenge: true },
    });
  }
}
