/**
 * @module metadata
 */

import { isObservable, Observable } from 'rxjs';
import { DecoratorPayload } from '../creation';
import { ReactiveModel, setterFactory } from '../model';
import { MetadataHandler } from './metadata-handler';

export const INIT_OPERATOR = 'Initialize Operator';

/**
 * This operator stores an observable in the decorated
 * property. Useful for initializing decoration streams.
 */
export interface InitOperatorPayload extends DecoratorPayload {
  /**
   * An observable to store in the decorated property.
   */
  observable: Observable<any>;
}

/**
 *
 * A metadata type that stores an observable onto a property
 * of a reactive model. Used to initialize a stream.
 *
 */
export class InitOperatorMetadata {
  readonly type = INIT_OPERATOR;

  constructor(public payload: InitOperatorPayload) {}
}

/**
 * Handles all InitOperatorMetadata applied to a ReactiveModel.
 */
export class InitOperatorHandler implements MetadataHandler {
  /**
   * Retrieves the observable stored in the metadata payload
   * and sets the value of the property to that observable.
   *
   * @param model the reactive model the decorator is applied to
   * @param propertyName the property the decorator is applied to
   * @param payload the init operator payload
   */
  handle(model: ReactiveModel, propertyName, payload: InitOperatorPayload): void {
    const { observable } = payload;

    if (!observable || !isObservable(observable)) {
      throw new Error('Observable was undefined');
    }

    const set = setterFactory(model, propertyName);

    set(observable);
  }
}
