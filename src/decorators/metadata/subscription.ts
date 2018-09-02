/**
 * @module metadata
 */

import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';

export const SUBSCRIPTION_FUNCTION = 'Subscription Function';

export type SubscriptionMetadataPayload = string[];

export class SubscriptionMetadata {
  readonly type = SUBSCRIPTION_FUNCTION;
  constructor(public payload: string[]) {}
}

export interface SubscriptionMetadataContainer {
  [key: string]: SubscriptionMetadata[];
}

/**
 * Handles the SubsriptionMetadata by subscripting to the observable the
 * decorator is applied to with no provided subscribe function.
 *
 * @see SubscriptionRetriever
 */
export class SubscriptionHandler implements MetadataHandler {
  /**
   * Subscribes to the observable located at the property name
   * and adds the subscription to a list to be disposed at model destruction.
   * @param model the reactive model the decorator is applied to
   * @param propertyName the property the decorator is applied to
   * @param payload unused
   */
  handle(model: ReactiveModel, propertyName: string, payload: SubscriptionMetadataPayload) {
    model.subscriptions.push(model[propertyName].subscribe());
  }
}
