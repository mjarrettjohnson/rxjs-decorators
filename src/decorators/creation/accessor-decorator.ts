import { isObservable } from '../utils';
import { InvalidReturnType } from './method-decorator';
import { MonoOperatorMetadata } from '../metadata';

export class IncorrectDecoratorType extends Error {
  constructor(message: string, context: any, property: string, decorator: string) {
    const error = `
    ----------------------------------------------
    Class: ${context.constructor.name}
    Property: ${property}
    Decorator: ${decorator}
    Message: ${message}
    ----------------------------------------------
    `;
    super(error);
  }
}

export function createAccessorDecorator<T, K>(metadata: MonoOperatorMetadata): MethodDecorator {
  return function (target: any, key: string, descriptor: any) {
    const { name, operator, fn } = metadata.payload;

    if (!descriptor.get) {
      throw new IncorrectDecoratorType('Accessor decorator cannot be applied to a function', target, key, name);
    }
    const func = descriptor.get;

    descriptor.get = function () {
      const evaluated = func();
      if (!isObservable(evaluated)) {
        throw new InvalidReturnType('Accessor must return an observable', target, key, name);
      }
      return evaluated.pipe(operator(fn));
    };

    return descriptor;
  };
}
