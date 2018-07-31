import { isObservable } from '../utils';
import { MonoOperatorMetadata } from '../metadata';

export class InvalidReturnType extends Error {
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

export function createMethodDecorator<T, K>(metadata: MonoOperatorMetadata): MethodDecorator {
  return function (target: any, key: string, descriptor: any) {
    const func = descriptor.value;

    const { name, operator, fn } = metadata.payload;

    descriptor.value = function () {
      const evaluated = func();
      if (!isObservable(evaluated)) {
        throw new InvalidReturnType('Function must return an observable', target, key, name);
      }
      return evaluated.pipe(operator(fn));
    };

    return descriptor;
  };
}
