import { Observable, UnaryFunction, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class InvalidFunctionDecoratorError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const createFunctionError = (context: object, key: string, decoratorName: string) => (error: Error) => {
  throw new InvalidFunctionDecoratorError(`
  ----------------------------------------------
  Class: ${context.constructor.name}
  Method: ${key}
  Decorator: ${decoratorName}
  Message: ${error.message}
  ----------------------------------------------
  `);
}

/**
 * Creates an function decorator function by applying the operator in the 
 * observable pipeline
 * 
 * @export
 * @param {OperatorFunction<T, K>} operator the rxjs operator to apply
 * @param {string} decoratorName the name of the decorator
 * @returns {MethodDecorator} a function decorator
 */
export function createFunctionDecorator<T, K>(operator: OperatorFunction<T, K>, decoratorName: string) {
  return function (target: any, key: string, descriptor: any) {

    let _val = target[key];

    const func = descriptor.value;

    descriptor.value = function (this) {
      const errorHandler = createFunctionError(this, key, decoratorName)

      return func().pipe(operator, catchError(errorHandler));
    }

    return descriptor;
  }
}
