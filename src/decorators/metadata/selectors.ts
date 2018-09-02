/**
 * @module metadata
 */
import { Selector } from 'reselect';
import { DecoratorPayload } from '../creation';
import { NoStoreProvidedError, ReactiveModel, setterFactory } from '../model';
import { MetadataHandler } from './metadata-handler';

export const SELECTOR_FUNCTION = 'Selector Function';

export interface SelectorPayload extends DecoratorPayload {
  /**
   * A selector function to be used in conjunction with an NgRx store.
   */
  selector: Selector<any, any>;
}

export class SelectorMetadata {
  readonly type = SELECTOR_FUNCTION;

  constructor(public payload: SelectorPayload) {}
}

/**
 * Handles SelectorMetada by applying the selector to the provided
 * ngrx store
 */
export class SelectorFunctionHandler implements MetadataHandler {
  /**
   * Uses the supplied selector function and passes it to the store
   * observable storing the resultant observable value at the property
   * the decorator is applied to.
   *
   * @param model the reactive model the decorator is applied to
   * @param propertyName the property the decorator is applied to
   * @param payload the selector function
   */
  handle(model: ReactiveModel, propertyName: string, payload: SelectorPayload) {
    const { selector } = payload;

    if (!model.store) {
      throw new NoStoreProvidedError(model, propertyName);
    }

    const set = setterFactory(model, propertyName);

    set(model.store.select(selector));
  }
}
