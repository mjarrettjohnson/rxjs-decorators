import { Observable, UnaryFunction } from 'rxjs';

export const isObservable = (x: any): boolean => x instanceof Observable;

export const propertyExists = (o: object, key: string) => !!o[key];


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
