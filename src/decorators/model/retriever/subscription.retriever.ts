import 'reflect-metadata';
import { SUBSCRIPTION_METADATA, SubscriptionMetadata, SubscriptionMetadataContainer } from '../../metadata';
import { checkType } from '../errors';
import { ReactiveModel } from '../reactive-model';

export class SubscriptionDataRetriever {
  constructor(private model: ReactiveModel) { }

  retrieve() {
    const metadata: SubscriptionMetadataContainer = Reflect.getMetadata(SUBSCRIPTION_METADATA, this.model);

    if (!metadata) {
      return;
    }

    Object.keys(metadata).forEach(this.handleSubscriptionMetadata(metadata));
  }

  private handleSubscriptionMetadata = (metadata: SubscriptionMetadataContainer) => (metadataKey: string) => {
    const subscriptionMetadata: SubscriptionMetadata[] = metadata[metadataKey];

    subscriptionMetadata.forEach(this.linkSubscriptions(metadataKey));
  };

  private linkSubscriptions = (fnName: string) => (current: SubscriptionMetadata) => {
    const { payload } = current;

    let fn: (...args: any[]) => any = this.model[fnName];
    if (!fn) {
      fn = () => { };
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
