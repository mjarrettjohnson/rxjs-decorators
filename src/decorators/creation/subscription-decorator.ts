import { propertyExists } from '../utils';
import { SUBSCRIPTION_METADATA, SubscriptionMetadata, SubscriptionMetadataContainer } from '../metadata';


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
