import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../environment';

export interface ShortenResult {
  shortId: string;
}

export interface ResolveResult {
  longUrl: string;
}

@Injectable()
export class UrlService {
  private readonly coreApiUrl: string;

  constructor(configService: ConfigService<Environment>) {
    this.coreApiUrl = configService.get('coreApiUrl');
  }

  async shorten(longUrl: string): Promise<ShortenResult> {
    const apiUrl = `${this.coreApiUrl}/url/shorten`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ longUrl }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return {
      shortId: data.shortId,
    };
  }

  async resolve(shortId: string): Promise<ResolveResult> {
    const apiUrl = `${this.coreApiUrl}/url/resolve/${shortId}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return {
      longUrl: data.longUrl,
    };
  }
}
