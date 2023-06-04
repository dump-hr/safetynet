import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
