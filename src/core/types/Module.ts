import { Type } from '.';
import { ICommand } from '../interfaces/ICommand';
import { IModule } from '../interfaces/IModule';

export type Provider = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  provide: string | Function | Type<any>;
  useValue?: any;
  useClass?: any;
};

export type ModuleOptions = {
  modules?: Type<IModule>[];
  commands?: Type<ICommand>[];
  providers?: (Type<any> | Provider)[];
};
