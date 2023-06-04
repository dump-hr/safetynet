import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [ScoreController],
  providers: [ScoreService, PrismaService],
})
export class ScoreModule {}
