import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Difficulty } from '@prisma/client';

@Injectable()
export class ParseDifficultyPipe implements PipeTransform {
  transform(value: any) {
    if (!value || Difficulty[value] === undefined) {
      throw new BadRequestException('Invalid value for Difficulty');
    }
    return value as Difficulty;
  }
}
