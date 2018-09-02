/**
 * @module creation
 */

import { isObservable } from 'rxjs';
import { MonoOperatorMetadata } from '../metadata';

/**
 * An error that is thrown if an observable is not returned
 * from a method that a decorator is applied to
 */
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

/**
 *
 * Returns a decorator that will evaluate the decorated method
 * and apply a single rxjs operator and corresponding function / data
 * to its return.
 *
 * @param {MonoOperatorMetadata} metadata the method context
 */
export function createMethodDecorator(metadata: MonoOperatorMetadata): any {
  return function(target: any, key: string, descriptor: any) {
    const func = descriptor.value;

    const { name, operator, fn } = metadata.payload;

    descriptor.value = function() {
      const evaluated = func();
      if (!isObservable(evaluated)) {
        throw new InvalidReturnType('Function must return an observable', target, key, name);
      }
      return evaluated.pipe(operator(fn));
    };

    return descriptor;
  };
}
