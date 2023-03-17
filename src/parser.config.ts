import { ParserInterface } from './parser.interface';
import { ParserTypeEnum } from './parser.type.enum';

export const parserConfig: ParserInterface[] = [
  {
    type: ParserTypeEnum.trendyol,
    selector: '.product-price-container',
    replaceList: [
      { old: ' TL', new: '' },
      { old: '.', new: ',' },
    ],
  },
];
