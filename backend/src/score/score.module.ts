import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
