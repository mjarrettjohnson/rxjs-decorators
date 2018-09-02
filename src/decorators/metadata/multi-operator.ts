/**
 * @module metadata
 */
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { DecoratorPayload } from '../creation';
import { allParametersExist, checkType, getObservableFactory, ReactiveModel, setterFactory } from '../model';
import { MetadataHandler } from './metadata-handler';

export const MULTI_OPERATOR = 'Multi Operator';

export type MultiOperator = (...array: Array<ObservableInput<any>>) => OperatorFunction<any, any>;

export interface MultiOperatorPayload extends DecoratorPayload {
  /**
   * a multi argument rxjs operator
   */
  operator: MultiOperator;
  /**
   * the arguments to be supplied to the attahed operator
   */
  operatorArgs: string[];
}

export class MultiOperatorMetadata {
  readonly type = MULTI_OPERATOR;

  constructor(public payload: MultiOperatorPayload) {}
}

/**
 * Handles MultiOperatorMetadata by applying the supplied operator args
 * to the rxjs operator and piping it onto the property observable
 */
export class MultiOperatorHandler implements MetadataHandler {
  /**
   *
   * @param model the reactive model the decorator is applied to
   * @param propertyName the property the decorator is applied to
   * @param payload the multi operator payload.
   */
  handle(model: ReactiveModel, propertyName: string, payload: MultiOperatorPayload) {
    const { name, operator, operatorArgs } = payload;

    const get = getObservableFactory(model);
    const set = setterFactory(model, propertyName);

    const args: Array<Observable<any>> = operatorArgs.map(allParametersExist(model));

    const error = checkType(model, get(propertyName), propertyName, name);

    if (error) {
      throw error;
    }

    const observable: Observable<any> = get(propertyName).pipe(operator(...args));

    set(observable);
  }
}
