/* eslint-disable @typescript-eslint/ban-types */
import { Type } from '.';
import { ICommand } from '../interfaces/ICommand';
import { IModule } from '../interfaces/IModule';

export type Provider = {
  provide: string | Function | Type<any>;
  useValue?: any;
  useClass?: any;
  useFactory?: Function;
  inject?: (string | Function | Type<any>)[];
};

export type ModuleOptions = {
  modules?: Type<IModule>[];
  commands?: Type<ICommand>[];
  providers?: (Type<any> | Provider)[];
};
