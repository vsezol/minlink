import { Module } from '@nestjs/common';
import { UrlModule } from './features/url/url.module';

@Module({
  imports: [UrlModule],
})
export class AppModule {}
