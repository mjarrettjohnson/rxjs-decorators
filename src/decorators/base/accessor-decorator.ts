import { Observable, UnaryFunction, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class InvalidAccessorDecoratorError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const createAccessorError = (context: object, key: string, decoratorName: string) => (error: Error) => {
  throw new InvalidAccessorDecoratorError(`
  ----------------------------------------------
  Class: ${context.constructor.name}
  Accessor: ${key}
  Decorator: ${decoratorName}
  Message: ${error.message}
  ----------------------------------------------
  `);
}

/**
 * Creates an accessor decorator function by applying the operator in the 
 * observable pipeline
 * 
 * @export
 * @param {OperatorFunction<T, K>} operator the rxjs operator to apply
 * @param {string} decoratorName the name of the decorator
 * @returns {MethodDecorator} a function decorator
 */
export function createAccessorDecorator<T, K>(operator: OperatorFunction<T, K>, decoratorName: string) {
  return function (target: any, key: string, descriptor: any) {

    let _val = target[key];

    const getter = descriptor.get;

    descriptor.get = function (this) {
      const errorHandler = createAccessorError(this, key, decoratorName)

      return getter().pipe(operator, catchError(errorHandler));
    }

    return descriptor;
  }
}
