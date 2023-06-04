import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Answer, Difficulty } from '@prisma/client';
import { ParseDifficultyPipe } from 'src/utils/parseDifficultyPipe';
import { QuestionDto } from './question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':difficulty')
  async getQuestions(
    @Param('difficulty', ParseDifficultyPipe) difficulty: Difficulty,
  ): Promise<QuestionDto[]> {
    return await this.questionService.getQuestions(difficulty);
  }

  @Get('check-answer/:answerId')
  async checkAnswer(
    @Param('answerId', ParseIntPipe) answerId: number,
  ): Promise<boolean> {
    return await this.questionService.checkAnswer(answerId);
  }

  @Get('correct-answer/:questionId')
  async getCorrectAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Answer> {
    return await this.questionService.getCorrectAnswer(questionId);
  }
}
