import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BorrowBookDto } from './dto/create-loan.dto';
import { ReturnBookDto } from './dto/return-loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(dto: BorrowBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });

    if (!book || book.stock <= 0) {
      throw new BadRequestException('Buku tidak tersedia');
    }

    return this.prisma.$transaction([
      this.prisma.loan.create({
        data: {
          memberId: dto.memberId,
          bookId: dto.bookId,
          borrowDate: dto.borrowDate,
          dueDate: dto.dueDate,
          status: 'BORROWED',
        },
      }),
      this.prisma.book.update({
        where: { id: dto.bookId },
        data: { stock: { decrement: 1 } },
      }),
    ]);
  }

  async returnBook(dto: ReturnBookDto) {
    const loan = await this.prisma.loan.findUnique({
      where: { id: dto.loanId },
    });

    if (!loan || loan.status === 'RETURNED') {
      throw new BadRequestException('Data peminjaman tidak valid');
    }

    return this.prisma.$transaction([
      this.prisma.loan.update({
        where: { id: dto.loanId },
        data: {
          status: 'RETURNED',
          returnDate: dto.returnDate,
        },
      }),
      this.prisma.book.update({
        where: { id: loan.bookId },
        data: { stock: { increment: 1 } },
      }),
    ]);
  }

  findAll() {
    return this.prisma.loan.findMany({
      include: {
        book: true,
        member: true,
      },
    });
  }
}