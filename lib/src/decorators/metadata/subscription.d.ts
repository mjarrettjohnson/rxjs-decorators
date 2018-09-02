/**
 * @module metadata
 */
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
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
/**
 * Handles the SubsriptionMetadata by subscripting to the observable the
 * decorator is applied to with no provided subscribe function.
 *
 * @see SubscriptionRetriever
 */
export declare class SubscriptionHandler implements MetadataHandler {
    /**
     * Subscribes to the observable located at the property name
     * and adds the subscription to a list to be disposed at model destruction.
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload unused
     */
    handle(model: ReactiveModel, propertyName: string, payload: SubscriptionMetadataPayload): void;
}
