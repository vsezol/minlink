import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ResolveResult, ShortenResult, UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async postShorten(@Body('longUrl') longUrl: string): Promise<ShortenResult> {
    Logger.log(`[postShorten] request longUrl: ${longUrl}`);

    const data = this.urlService.shorten(longUrl);

    Logger.log(`[postShorten] response shortId: ${data.shortId}`);

    return data;
  }

  @Get('resolve/:shortId')
  async getResolveShortId(
    @Param('shortId') shortId: string
  ): Promise<ResolveResult> {
    Logger.log(`[getResolveShortId] request shortId: ${shortId}`);

    const data = this.urlService.resolve(shortId);

    Logger.log(`[postShorten] response longUrl: ${data.longUrl}`);

    return data;
  }
}
