/**
 * @module metadata
 */

import { Observable, UnaryFunction } from 'rxjs';
import { DecoratorPayload } from '../creation';
import { checkType, getObservableFactory, ReactiveModel, setterFactory } from '../model';
import { MetadataHandler } from './metadata-handler';

export const MONO_OPERATOR = 'Mono Operator';

export type MonoOperatorFn = (...args: any[]) => UnaryFunction<any, any>;

export type Fn = (...args: any[]) => any;

export type Callable = Fn | string | number | undefined;

export interface MonoOperatorPayload extends DecoratorPayload {
  /**
   * A single arity rxjs operator.
   */
  operator: MonoOperatorFn;
  /**
   * The function | string | number to apply to the operator
   */
  fn: Callable;
  /**
   * Determines if the this value is bound to the function
   */
  isBound?: boolean;
}

export class MonoOperatorMetadata {
  readonly type = MONO_OPERATOR;

  constructor(public payload: MonoOperatorPayload) {}
}

/**
 * Handles MonoOperatorMetadata by piping the supplied operator and
 * arguments to the observable that the decorator is applied to.
 */
export class MonoOperatorHandler implements MetadataHandler {
  /**
   * Pipes the operator with its supplied arguments onto the observable
   * that is returned by accessing the model at the supplied property name.
   *
   * @param model the reactive model the decorator is applied to
   * @param propertyName the property the decorator is applied to
   * @param payload the operator and arguments
   */
  handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorPayload) {
    const { operator, name, isBound } = payload;
    let fn = payload.fn;

    const get = getObservableFactory(model);
    const set = setterFactory(model, propertyName);

    const observable = get(propertyName) as Observable<any>;

    if (isBound && typeof fn === 'function') {
      fn = fn.bind(this);
    }

    const error = checkType(model, observable, propertyName, name);

    if (error) {
      throw error;
    }

    set(observable.pipe(operator(fn)));
  }
}
