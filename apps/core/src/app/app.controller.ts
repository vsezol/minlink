import {
  Body,
  Controller,
  Get,
  Logger,
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
    Logger.log('REQUEST /shorten ' + longUrl);

    return {
      shortUrl: this.appService.shorten(longUrl),
    };
  }

  @Get('resolve/:shortId')
  async resolve(
    @Param('shortId') shortId: string
  ): Promise<{ longUrl: string }> {
    Logger.log('REQUEST resolve/:shortId ' + shortId);

    const longUrl = this.appService.resolve(shortId);

    if (!longUrl) {
      throw new NotFoundException('URL not found');
    }

    return { longUrl };
  }
}
