export declare const SUBSCRIPTION_FUNCTION = "Subscription Function";
export declare class SubscriptionMetadata {
    propName: string;
    readonly type: string;
    constructor(propName: string);
}
export interface SubscriptionMetadataContainer {
    [key: string]: SubscriptionMetadata[];
}
//# sourceMappingURL=subscription.d.ts.map