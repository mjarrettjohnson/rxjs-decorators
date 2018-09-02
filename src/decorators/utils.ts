/**
 * @module utils
 */

import { UnaryFunction } from 'rxjs';

/**
 * Determines if a property exists on a supplied object
 * @param o the object that the property is meant to exist on
 * @param key the property name
 */
export const propertyExists = (o: object, key: string) => !!o[key];

/**
 * Creates a Pipelin from an array of operators. Taken from rxjs/internals
 * @param fns a list of rxjs operators
 */
export function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R> {
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

export function noop() {}
