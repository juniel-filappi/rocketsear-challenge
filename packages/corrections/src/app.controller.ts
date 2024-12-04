import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @MessagePattern('challenge.correction')
  correctLesson(
    @Payload() message: CorrectLessonMessage,
  ): CorrectLessonResponse {
    const { submissionId, repositoryUrl } = message.value;

    this.logger.log(
      `Correcting submission ${submissionId} with repository ${repositoryUrl}`,
    );

    return {
      submissionId,
      repositoryUrl,
      grade: Math.floor(Math.random() * 10) + 1,
      status: 'Done',
    };
  }
}
