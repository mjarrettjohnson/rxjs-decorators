import { SUBSCRIPTION_METADATA, SubscriptionMetadata, SubscriptionMetadataContainer } from '../metadata';
import { propertyExists } from '../utils';

export const createSubscriptionDecorator = (propertyNames: string[]) => (target: object, key: string) => {
  const metadata = Reflect.getMetadata(SUBSCRIPTION_METADATA, target) || ({} as SubscriptionMetadataContainer);

  const payload = new SubscriptionMetadata(propertyNames);

  if (!propertyExists(metadata, key)) {
    metadata[key] = [payload];
  } else {
    metadata[key] = [...metadata[key], payload];
  }

  Reflect.defineMetadata(SUBSCRIPTION_METADATA, metadata, target);
};
