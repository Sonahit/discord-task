import { COMMAND_METADATA } from '../constants/reflect.constants';
import { CommandOptions } from '../types/Command';

export function Command(options: CommandOptions): ClassDecorator {
  return (target) => {
    if (typeof options.arguments !== 'undefined') {
      options.arguments = options.arguments.map((a) => {
        if (typeof a.required === 'undefined') {
          a.required = true;
        }
        return a;
      });
    }
    Reflect.defineMetadata(COMMAND_METADATA, options, target);
  };
}
