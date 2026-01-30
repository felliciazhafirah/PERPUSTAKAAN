import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'FELLI IMUT BNGTTT';
  }
  getWelcome(): string {
return 'Welcome to Library API';
}
    penjumlahan(a: number, b: number): number {
    return a + b;
}
    perkalian(a: number, b: number): number {
    return a * b;
}
}
