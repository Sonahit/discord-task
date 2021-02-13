import { PROPERTY_DEPS_METADATA, SELF_DECLARED_DEPS_METADATA, TYPE_METADATA } from '../constants/reflect.constants';

export function Inject<T = any>(token: T): ParameterDecorator | PropertyDecorator {
  return (target, key, index) => {
    token = token || Reflect.getMetadata(TYPE_METADATA, target, key);
    const type = token && typeof token === 'function' ? token.name : token;

    if (typeof index !== 'undefined') {
      let deps = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, target) || [];
      deps = [...deps, { index, param: type }];
      Reflect.defineMetadata(SELF_DECLARED_DEPS_METADATA, deps, target);
      return;
    }

    let properties = Reflect.getMetadata(PROPERTY_DEPS_METADATA, target.constructor) || [];

    properties = [...properties, { key, type }];

    Reflect.defineMetadata(PROPERTY_DEPS_METADATA, properties, target.constructor);
  };
}
