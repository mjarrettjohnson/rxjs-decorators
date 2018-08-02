export declare const SUBSCRIPTION_FUNCTION = "Subscription Function";
export declare type SubscriptionMetadataPayload = string[];
export declare class SubscriptionMetadata {
    payload: string[];
    readonly type: string;
    constructor(payload: string[]);
}
export interface SubscriptionMetadataContainer {
    [key: string]: SubscriptionMetadata[];
}
