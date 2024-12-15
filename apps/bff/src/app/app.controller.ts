import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
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
    Logger.log(`111 REQUEST ${this.coreApiUrl}/url/shorten`);

    const response = await fetch(`${this.coreApiUrl}/url/shorten`, {
      method: 'POST',
      body: JSON.stringify({ longUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    Logger.log(`111 RESPONSE FROM ${this.coreApiUrl}/url/shorten`);
    Logger.log(JSON.stringify(response, null, 4));

    const data = await response.json();

    Logger.log(`111 DATA FROM ${this.coreApiUrl}/url/shorten`);
    Logger.log(JSON.stringify(data, null, 4));

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
