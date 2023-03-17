import { ParserTypeEnum } from './parser.type.enum';

export interface ParserInterface {
  type: ParserTypeEnum;
  selector: string;
  replaceList: { old: string; new: string }[];
}
