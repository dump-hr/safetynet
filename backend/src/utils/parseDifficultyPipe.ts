import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Difficulty } from '@prisma/client';

@Injectable()
export class ParseDifficultyPipe implements PipeTransform {
  transform(value: any) {
    if (!value || Difficulty[value] === undefined)
      throw new HttpException(
        'Invalid value for Difficulty',
        HttpStatus.BAD_REQUEST,
      );

    return value as Difficulty;
  }
}
