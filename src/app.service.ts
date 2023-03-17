import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { catchError, config, lastValueFrom, map } from 'rxjs';
import { JSDOM } from 'jsdom';
import { ParserInterface } from './parser.interface';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  static config: ParserInterface[];
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }

  @Cron('45 * * * * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 45');

    const html = await this.downloadHtml(
      'https://www.trendyol.com/microsoft/xbox-series-s-512-gb-oyun-konsolu-beyaz-ithalatci-garantili-p-69934602',
    );
    this.logger.log({ html });

    const h1 = await this.parseHtml(html);

    this.logger.log({ h1 });
  }

  async downloadHtml(url: string): Promise<string> {
    const html = await lastValueFrom(
      this.httpService.get(url).pipe(map((res) => res.data)),
    );
    return html;
  }

  async parseHtml(html: string): Promise<string> {
    const dom = new JSDOM(html);
    const h1 = dom.window.document.querySelector(
      '.product-price-container',
    ).textContent;
    return h1;
  }

  onApplicationBootstrap(): any {}
}
