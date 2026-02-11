import { IsNumber, IsDateString } from 'class-validator';

export class BorrowBookDto {
  @IsNumber()
  memberId: number;
  @IsNumber()
  bookId: number;
  @IsDateString()
  borrowDate: string;
  @IsDateString()
  dueDate: string;
}