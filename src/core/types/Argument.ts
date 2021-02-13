import { ArgumentsEnum } from '../enums/arguments.enum';

export type Argument = {
  name: string;
  type: ArgumentsEnum;
  required?: boolean;
};
