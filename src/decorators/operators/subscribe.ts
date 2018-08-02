import { createDecorator } from '../creation';
import { SubscriptionMetadata } from '../metadata';

export function Subscribe(propertyNames: string[]) {
  return createDecorator(new SubscriptionMetadata(propertyNames));
}
