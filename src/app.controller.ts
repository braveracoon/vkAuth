/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './app.vkAuthGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHello() {
    return 'Выигрыш есть, можно поесть';
  }


}
