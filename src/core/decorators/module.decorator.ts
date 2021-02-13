import { MODULE_METADATA } from '../constants/reflect.constants';
import { ModuleOptions } from '../types/Module';

export function Module(options: ModuleOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MODULE_METADATA, options, target);
  };
}
