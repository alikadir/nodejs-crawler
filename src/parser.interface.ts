import { ParserType } from './parser.config';

export interface ConfigInterface {
  type: ParserType;
  selector: string;
  replaceList: { old: string; new: string }[];
}
