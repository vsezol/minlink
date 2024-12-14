import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './environment';

@Controller('url')
export class AppController {
  private readonly coreApiUrl: string;

  constructor(configService: ConfigService<Environment>) {
    this.coreApiUrl = configService.get('coreApiUrl');
  }

  @Post('shorten')
  async postShorten(
    @Body('longUrl') longUrl: string
  ): Promise<{ shortUrl: string }> {
    const response = await fetch(`${this.coreApiUrl}/url/shorten`, {
      method: 'POST',
      body: JSON.stringify({ longUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }

  @Get('resolve/:shortId')
  async resolve(
    @Param('shortId') shortId: string
  ): Promise<{ longUrl: string }> {
    const response = await fetch(`${this.coreApiUrl}/url/resolve/${shortId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return { longUrl: data.longUrl };
  }
}
