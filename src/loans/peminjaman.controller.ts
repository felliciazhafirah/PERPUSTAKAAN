import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LoansService } from './peminjaman.service';
import { BorrowBookDto } from './dto/create-loan.dto';
import { ReturnBookDto } from './dto/return-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('borrow')
  borrowBook(@Body() dto: BorrowBookDto) {
    return this.loansService.borrowBook(dto);
  }

  @Post('return')
  returnBook(@Body() dto: ReturnBookDto) {
    return this.loansService.returnBook(dto);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }
}