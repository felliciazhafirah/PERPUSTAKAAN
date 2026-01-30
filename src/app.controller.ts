import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('welcome')
  getWelcome(): string {
  return this.appService.getWelcome();
}
  @Get('penjumlahan')
  penjumlahan(): number {
    return this.appService.penjumlahan(5, 10);
  }
   @Get('perkalian')
  perkalian(): number {
    return this.appService.perkalian(5, 10);
  }
}
 


