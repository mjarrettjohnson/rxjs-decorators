import 'reflect-metadata';
import { Observable, UnaryFunction, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class InvalidPropertyDecoratorError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const createPropertyError = (context: object, key: string, decoratorName: string) => (error: Error) => {
  throw new InvalidPropertyDecoratorError(`
  ----------------------------------------------
  Class: ${context.constructor.name}
  Property: ${key}
  Decorator: ${decoratorName}
  Message: ${error.message}
  ----------------------------------------------
  `);
}

/**
 * Creates an property decorator function by applying the operator in the 
 * observable pipeline
 * 
 * @export
 * @param {OperatorFunction<T, K>} operator the rxjs operator to apply
 * @param {string} decoratorName the name of the decorator
 * @returns {PropertyDecorator} a function decorator
 */
export function createPropertyDecorator<T, K>(operator: OperatorFunction<T, K>, decoratorName: string) {
  return function (target: any, key: string) {

    // Property value.
    let _val: Observable<T> = target[key];
    // Property setter.
    const setter = function (newVal) {
      _val = newVal;
    };

    const getter = function () {
      const errorHandler = createPropertyError(this, key, decoratorName)

      return _val.pipe(operator, catchError(errorHandler));
    }
    // Delete property.
    if (delete target[key]) {
      // Create new property with getter and setter
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  }
}

