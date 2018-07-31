import 'reflect-metadata';
import { ReactiveModel, checkType } from "./reactive-model";
import { SUBSCRIPTION_METADATA, SubscriptionMetadataContainer, SubscriptionMetadata } from "../metadata";

export class SubscriptionDataHandler {
  constructor(private model: ReactiveModel) { }

  apply() {
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
    const { propName } = current;

    let error = checkType(this.model, this.model[propName], propName, 'Subscribe');

    if (error) {
      throw error;
    }

    this.model[propName].subscribe(this.model[fnName].bind(this.model));
  };
}