import { propertyExists } from '../utils';

export const SUBSCRIPTION_METADATA = '__subscriptions__';

export const SUBSCRIPTION_FUNCTION = 'Subscription Function';

export class SubscriptionMetadata {
  readonly type = SUBSCRIPTION_FUNCTION;
  constructor(public propName: string) {}
}

export interface SubscriptionMetadataContainer {
  [key: string]: SubscriptionMetadata[];
}

export const createSubscriptionDecorator = (propertyName: string) => (target: object, key: string) => {
  const metadata = Reflect.getMetadata(SUBSCRIPTION_METADATA, target) || ({} as SubscriptionMetadataContainer);

  const payload = new SubscriptionMetadata(propertyName);

  if (!propertyExists(metadata, key)) {
    metadata[key] = [payload];
  } else {
    metadata[key] = [...metadata[key], payload];
  }

  Reflect.defineMetadata(SUBSCRIPTION_METADATA, metadata, target);
};
