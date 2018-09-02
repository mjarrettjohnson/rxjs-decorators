/**
 * @module model
 */

import 'reflect-metadata';
import { Fn, SUBSCRIPTION_METADATA, SubscriptionMetadata, SubscriptionMetadataContainer } from '../metadata';
import { checkType } from './errors';
import { ReactiveModel } from './reactive-model';

/**
 * A class that is responsible for retrieving all subscription metadata from a reactive model, subscribing
 * to the target observables and managing subscription destruction.
 */
export class SubscriptionMetadataHandler {
  constructor(private model: ReactiveModel) {}

  /**
   * Retrieves all Subscription metadata and applies the provided methods as subscription handlers
   */
  public handle() {
    const metadata: SubscriptionMetadataContainer = Reflect.getMetadata(SUBSCRIPTION_METADATA, this.model);

    if (!metadata) {
      return;
    }

    Object.keys(metadata).forEach(this.handleSubscriptionMetadata(metadata));
  }

  /**
   * Iterates over all metadata and links the subscriptions to the reactive model methods.
   */
  private handleSubscriptionMetadata = (metadata: SubscriptionMetadataContainer) => (metadataKey: string) => {
    const subscriptionMetadata: SubscriptionMetadata[] = metadata[metadataKey];

    subscriptionMetadata.forEach(this.linkSubscriptions(metadataKey));
  };

  /**
   * Retrieves a method from the reactive model and applies it as the subscription
   * fuunction to the target observable property storing its subscription in
   * the model subscription array.
   */
  private linkSubscriptions = (fnName: string) => (current: SubscriptionMetadata) => {
    const { payload } = current;

    let fn: Fn = this.model[fnName];

    if (!fn) {
      fn = () => {};
    }

    payload.forEach((propName: string) => {
      const error = checkType(this.model, this.model[propName], propName, 'Subscribe');

      if (error) {
        throw error;
      }

      this.model.subscriptions.push(this.model[propName].subscribe(fn.bind(this.model)));
    });
  };
}
