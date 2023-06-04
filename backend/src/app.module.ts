import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

import { QuestionModule } from './question/question.module';
import { ScoreModule } from './score/score.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, QuestionModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
