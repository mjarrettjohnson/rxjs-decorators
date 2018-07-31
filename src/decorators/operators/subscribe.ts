import { createDecorator } from "../creation";
import { SubscriptionMetadata } from "../metadata";

export function Subscribe(propertyName: string) {
  return createDecorator(new SubscriptionMetadata(propertyName));
}

