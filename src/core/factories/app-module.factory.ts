import { App } from '../app';
import {
  COMMAND_METADATA,
  MODULE_METADATA,
  PARAMTYPES_METADATA,
  SELF_DECLARED_DEPS_METADATA,
} from '../constants/reflect.constants';
import { Container } from '../injector/container';
import { Dependency } from '../injector/injector.types';
import { ICommand } from '../interfaces/ICommand';
import { IModule } from '../interfaces/IModule';
import { Type } from '../types';
import { CommandOptions } from '../types/Command';
import { ModuleOptions, Provider } from '../types/Module';

export class AppModuleFactory {
  private moduleContainer = new Container();
  private providersContainer = new Container();
  private commandsContainer = new Container();

  constructor(private app: App) {}

  async create(module: Type<IModule>): Promise<App> {
    const modules = this.getModules(module);
    const commands = this.getCommands(modules);
    this.registerProviders(modules);
    this.app.registerCommands(
      await Promise.all(
        commands.map(async (instance) => ({
          instance: await this.initializeInstance(instance),
          options: Reflect.getMetadata(COMMAND_METADATA, instance) as CommandOptions,
        })),
      ),
    );
    await this.app.login();
    return this.app;
  }

  async initializeInstance<T>(instance: Type<T>): Promise<T> {
    const params = Reflect.getMetadata(PARAMTYPES_METADATA, instance) as any[];
    const dependencies = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, instance) as Dependency[];
    const args: any[] = [];
    if (params?.length) {
      if (dependencies && dependencies.length) {
        const initialized = dependencies.map((d) => {
          const concrete = this.providersContainer.getConcrete(d.param);
          if (!concrete) {
            throw new Error(`Provider ${d.param} is not found`);
          }
          return {
            ...d,
            concrete,
          };
        });
        initialized.forEach((v, i) => {
          args[i] = v.concrete;
        });
      } else {
        args.push(...(await Promise.all(params.map((p) => this.initializeInstance(p)))));
      }
    }
    return new instance(...args);
  }

  getModules(module: Type<IModule>): Type<IModule>[] {
    const metadata = Reflect.getMetadata(MODULE_METADATA, module) as ModuleOptions;
    const modules = [module] as Type<IModule>[];
    if (metadata?.modules?.length) {
      const submodules = ([] as Type<IModule>[]).concat(...metadata.modules.map((m) => this.getModules(m)));
      modules.push(...submodules);
    }
    modules.forEach((m) => this.bindToContainer(m, this.moduleContainer));
    return modules;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  createToken(concrete: Type<any> | Function): symbol | string {
    return concrete.name;
  }

  bindToContainer(concrete: Type<any>, container: Container): void {
    const token = this.createToken(concrete);

    container.bind(token, concrete);
  }

  getModuleCommands(module: Type<IModule>): Type<ICommand>[] {
    const metadata = Reflect.getMetadata(MODULE_METADATA, module) as ModuleOptions;
    const commands = [] as Type<ICommand>[];
    if (metadata?.commands?.length) {
      commands.push(...metadata.commands);
    }
    commands.forEach((m) => this.bindToContainer(m, this.commandsContainer));
    return commands;
  }

  getCommands(modules: Type<IModule>[]): Type<ICommand>[] {
    return ([] as Type<ICommand>[]).concat(...modules.map((m) => this.getModuleCommands(m)));
  }

  registerProviders(modules: Type<IModule>[]): void {
    const providers: Provider[] | Type<any>[] = ([] as any[])
      .concat(...modules.map((m) => (Reflect.getMetadata(MODULE_METADATA, m) as ModuleOptions)?.providers))
      .filter(Boolean);
    providers.forEach((p: Type<any> | Provider) => {
      let token;
      let value;
      if (typeof p === 'function') {
        token = this.createToken(p);
        value = p;
      } else {
        token = typeof p.provide === 'function' ? this.createToken(p.provide) : p.provide;
        value = p.useClass || p.useValue;
      }
      this.providersContainer.bind(token, value);
    });
  }
}
