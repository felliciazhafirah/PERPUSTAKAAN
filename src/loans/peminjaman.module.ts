import { Module } from '@nestjs/common';
import { LoansService } from './peminjaman.service';
import { LoansController } from './peminjaman.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LoansController],
  providers: [
    LoansService,
    PrismaService,
  ],
  exports: [LoansService],
})
export class LoansModule {}