export const SUBSCRIPTION_FUNCTION = 'Subscription Function';

export type SubscriptionMetadataPayload = string[];

export class SubscriptionMetadata {
  readonly type = SUBSCRIPTION_FUNCTION;
  constructor(public payload: string[]) {}
}

export interface SubscriptionMetadataContainer {
  [key: string]: SubscriptionMetadata[];
}
