import { Injectable } from '@nestjs/common';

export interface ShortenResult {
  shortId: string;
}

export interface ResolveResult {
  longUrl: string;
}

@Injectable()
export class UrlService {
  private readonly urlMap = new Map<string, string>();

  shorten(longUrl: string): ShortenResult {
    const shortId = Math.random().toString(36).slice(2, 8);

    this.urlMap.set(shortId, longUrl);

    return { shortId };
  }k

  resolve(shortId: string): ResolveResult | undefined {
    if (!this.urlMap.has(shortId)) {
      return undefined;
    }

    return {
      longUrl: this.urlMap.get(shortId),
    };
  }
}
