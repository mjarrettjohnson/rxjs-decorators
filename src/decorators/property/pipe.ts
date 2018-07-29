import { Observable, OperatorFunction, UnaryFunction } from 'rxjs';
import { createPropertyDecorator } from '../base/property-decorator';

/**
 * Applies a set of operators to the returned observable. 
 * Any operators are applied after those in the base function.
 * 
 * 
 * @export
 * @param {Array<UnaryFunction<any, any>>} operators  a list of rxjs operators to run in the pipeline
 * @returns {PropertyDecorator} a property decorator
 */
export function Pipe(operators: Array<UnaryFunction<any, any>>): PropertyDecorator {
  return function (target: any, key: string) {


    // Property value.
    let _val: Observable<any> = target[key];
    // Property getter.
    const getter = function () {
      return pipeFromArray(operators)(_val);
    };
    // Property setter.
    const setter = function (newVal) {
      _val = newVal;
    };
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

function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R> {
  if (!fns) {
    return noop as UnaryFunction<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce((prev: any, fn: UnaryFunction<T, R>) => fn(prev), input as any);
  };
}

function noop() { }