import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly urlMap = new Map<string, string>();

  shorten(longUrl: string): string {
    const shortId = Math.random().toString(36).slice(2, 8);

    this.urlMap.set(shortId, longUrl);

    return shortId;
  }

  resolve(shortId: string): string | undefined {
    return this.urlMap.get(shortId);
  }
}
