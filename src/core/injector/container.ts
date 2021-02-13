export class Container {
  concretes: Map<string | symbol, any> = new Map();

  getConcrete<T>(abstract: string | symbol): T {
    return this.concretes.get(abstract);
  }

  bind<T>(abstract: string | symbol, concrete: T): void {
    this.concretes.set(abstract, concrete);
  }
}
