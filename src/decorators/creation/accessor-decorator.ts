/**
 * @module creation
 */

import { isObservable } from 'rxjs';
import { MonoOperatorMetadata } from '../metadata';
import { ReactiveModel } from '../model';
import { InvalidReturnType } from './method-decorator';

export interface GetterDescriptor {
  get: () => any;
  [key: string]: any;
}

/**
 * An error that is applied when an accessor decorator is applied to a function.
 *
 */
export class IncorrectDecoratorType extends Error {
  /**
   *
   * @param message the error message to dispaly
   * @param context the class that the decorator was applied to
   * @param property the property that the decorator was applied to
   * @param decorator the name of the decorator.
   */
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
 * Applies an rxjs operator to a getter that returns an observable
 *
 * @param metadata a decorator payload that is the context for the decorator
 */
export function createAccessorDecorator(metadata: MonoOperatorMetadata): any {
  return attachOperator.bind(metadata);
}

/**
 *
 * Applies a rxjs operator to an observable returned by the getter the
 * decorator is attached to.
 *
 * @param target A reactive model
 * @param key the property on the model
 * @param descriptor the describing object that has a getter attached
 */
function attachOperator(target: ReactiveModel, key: string, descriptor: GetterDescriptor): GetterDescriptor {
  const metadata = this;
  const { name, operator, fn } = metadata.payload;

  if (!descriptor.get) {
    throw new IncorrectDecoratorType('Accessor decorator cannot be applied to a function', target, key, name);
  }

  const func = descriptor.get;

  descriptor.get = function() {
    const evaluated = func();
    if (!isObservable(evaluated)) {
      throw new InvalidReturnType('Accessor must return an observable', target, key, name);
    }
    return evaluated.pipe(operator(fn));
  };

  return descriptor;
}
