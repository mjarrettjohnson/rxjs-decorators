export const SUBSCRIPTION_FUNCTION = 'Subscription Function';

export class SubscriptionMetadata {
  readonly type = SUBSCRIPTION_FUNCTION;
  constructor(public propName: string) { }
}

export interface SubscriptionMetadataContainer {
  [key: string]: SubscriptionMetadata[];
}
