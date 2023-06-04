import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

import { QuestionModule } from './question/question.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [QuestionModule, ScoreModule, PrismaService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
