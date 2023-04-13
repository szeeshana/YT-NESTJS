import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('first')
  getHello(): string {
    return this.appService.getHello('First');
  }

  @Get('second')
  getHelloSecond(): string {
    return this.appService.getHello('Second');
  }
}
