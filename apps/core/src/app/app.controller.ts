import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('url')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('shorten')
  async postShorten(
    @Body('longUrl') longUrl: string
  ): Promise<{ shortUrl: string }> {
    return {
      shortUrl: this.appService.shorten(longUrl),
    };
  }

  @Get('resolve/:shortId')
  async resolve(
    @Param('shortId') shortId: string
  ): Promise<{ longUrl: string }> {
    const longUrl = this.appService.resolve(shortId);

    if (!longUrl) {
      throw new NotFoundException('URL not found');
    }

    return { longUrl };
  }
}
