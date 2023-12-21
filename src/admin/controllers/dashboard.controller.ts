import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('admin')
export class DashboardController {
  constructor() {}

  @Get()
  // @Render('dashboard/dashboard')
  root(@Res() res: Response) {
    return res.render('dashboard/dashboard', { message: 'Hello world!!' });
  }
}
