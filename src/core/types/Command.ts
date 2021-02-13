import { Argument } from './Argument';

export type CommandOptions = {
  path: string;
  description: string;
  arguments?: Argument[];
};
