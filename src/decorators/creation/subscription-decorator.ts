/**
 * @module creation
 */

import { SUBSCRIPTION_METADATA, SubscriptionMetadata, SubscriptionMetadataContainer } from '../metadata';
import { propertyExists } from '../utils';

/**
 *
 * Applies a series of property names within a classes metadata based on the applied methods
 * property key. At runtime this function is used as a subscription to all properties previously mentioned.
 *
 * @example
 *
 * export class DecoratorDemo extends ReactiveModel {
 *
 *   seconds$ = interval(1000); *
 *
 *   constructor() {
 *     super();
 *     This.initialize();
 *   }
 *
 *   Subscribe('seconds$')
 *   logSecond(second: number) {
 *     console.log(second);
 *   }
 * }
 *
 * @param propertyNames a list of observable properties on a reactive model.
 *
 * @see ReactiveModel
 */
export const createSubscriptionDecorator = (...propertyNames: string[]) => (target: object, key: string) => {
  const metadata = Reflect.getMetadata(SUBSCRIPTION_METADATA, target) || ({} as SubscriptionMetadataContainer);

  const payload = new SubscriptionMetadata(propertyNames);

  if (!propertyExists(metadata, key)) {
    metadata[key] = [payload];
  } else {
    metadata[key] = [...metadata[key], payload];
  }

  Reflect.defineMetadata(SUBSCRIPTION_METADATA, metadata, target);
};
