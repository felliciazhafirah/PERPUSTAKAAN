import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoansModule } from './loans/peminjaman.module';

@Module({
  imports: [PrismaModule, BooksModule, MembersModule, AuthModule, UserModule, LoansModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
