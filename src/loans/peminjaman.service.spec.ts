import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './peminjaman.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('LoansService', () => {
  let service: LoansService;
  let prisma: PrismaService;

  const prismaMock = {
    book: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    loan: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<LoansService>(LoansService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('borrowBook', () => {
    it('should borrow a book successfully', async () => {
      prismaMock.book.findUnique.mockResolvedValue({
        id: 1,
        stock: 5,
      });

      prismaMock.$transaction.mockResolvedValue([
        { id: 1 },
        { id: 1, stock: 4 },
      ]);

      const result = await service.borrowBook({
        memberId: 1,
        bookId: 1,
        borrowDate: new Date(),
        dueDate: new Date(),
      });

      expect(prisma.book.findUnique).toHaveBeenCalled();
      expect(prisma.$transaction).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw error if book not available', async () => {
      prismaMock.book.findUnique.mockResolvedValue({
        id: 1,
        stock: 0,
      });

      await expect(
        service.borrowBook({
          memberId: 1,
          bookId: 1,
          borrowDate: new Date(),
          dueDate: new Date(),
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('returnBook', () => {
    it('should return a book successfully', async () => {
      prismaMock.loan.findUnique.mockResolvedValue({
        id: 1,
        bookId: 1,
        status: 'BORROWED',
      });

      prismaMock.$transaction.mockResolvedValue([
        { id: 1, status: 'RETURNED' },
        { id: 1, stock: 6 },
      ]);

      const result = await service.returnBook({
        loanId: 1,
        returnDate: new Date(),
      });

      expect(prisma.loan.findUnique).toHaveBeenCalled();
      expect(prisma.$transaction).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw error if loan invalid', async () => {
      prismaMock.loan.findUnique.mockResolvedValue(null);

      await expect(
        service.returnBook({
          loanId: 99,
          returnDate: new Date(),
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all loans', async () => {
      prismaMock.loan.findMany.mockResolvedValue([
        {
          id: 1,
          status: 'BORROWED',
          book: {},
          member: {},
        },
      ]);

      const result = await service.findAll();

      expect(prisma.loan.findMany).toHaveBeenCalled();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});