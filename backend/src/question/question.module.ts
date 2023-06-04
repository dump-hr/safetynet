import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
