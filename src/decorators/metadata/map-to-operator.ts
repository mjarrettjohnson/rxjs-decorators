/**
 * @module metadata
 */

import { DecoratorPayload } from '../creation';
import {
  checkType,
  FunctionDoesNotExistError,
  getFunctionFactory,
  getObservableFactory,
  ReactiveModel,
  setterFactory,
} from '../model';
import { MetadataHandler } from './metadata-handler';
import { MonoOperatorFn } from './mono-operator';

export const MAP_TO_OPERATOR = 'Map to operator';

/**
 * Represents the context required to apply an existing method
 * on the reactive model to the supplied operator.
 */
export interface MapToOperatorPayload extends DecoratorPayload {
  /**
   * The rxjs operator to apply
   */
  operator: MonoOperatorFn;
  /**
   * the method to provide as the operators function
   */
  methodName: string;
}

/**
 *
 * A metadata type that applies a reactive model method
 * to a rxjs operator
 *
 * @see MapToOperatorHandler
 */
export class MapToOperatorMetadata {
  readonly type = MAP_TO_OPERATOR;

  constructor(public payload: MapToOperatorPayload) {}
}

/**
 * Handles MapToOperatorMetadata. Applies an existing method on a
 * Reactive Model to the provided operator
 */
export class MapToOperatorHandler implements MetadataHandler {
  /**
   * Retrieves the reactive model's method and applies it to the
   * provided rxjs operator
   *
   * @param model the reactive model that the decorator was applied to
   * @param propertyName the property that the decorator was applied to
   * @param payload the map to operator payload
   */
  handle(model: ReactiveModel, propertyName: string, payload: MapToOperatorPayload) {
    const { methodName, operator, name } = payload;

    const get = getObservableFactory(model);
    const getFn = getFunctionFactory(model);
    const set = setterFactory(model, propertyName);

    const currentObs = get(propertyName);
    const currentFn = getFn(methodName);

    const error = checkType(model, currentObs, propertyName, name);

    if (error) {
      throw error;
    }

    if (!currentFn) {
      throw new FunctionDoesNotExistError(model, methodName, name);
    }

    const updatedObs = currentObs.pipe(operator(currentFn.bind(model)));

    set(updatedObs);
  }
}
