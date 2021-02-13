import { COMMAND_METADATA } from '../constants/reflect.constants';
import { CommandOptions } from '../types/Command';

export function Command(options: CommandOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(COMMAND_METADATA, options, target);
  };
}
