/**
 * @module model
 */
import 'reflect-metadata';
import { ReactiveModel } from './reactive-model';
/**
 * A class that is responsible for retrieving all subscription metadata from a reactive model, subscribing
 * to the target observables and managing subscription destruction.
 */
export declare class SubscriptionMetadataHandler {
    private model;
    constructor(model: ReactiveModel);
    /**
     * Retrieves all Subscription metadata and applies the provided methods as subscription handlers
     */
    handle(): void;
    /**
     * Iterates over all metadata and links the subscriptions to the reactive model methods.
     */
    private handleSubscriptionMetadata;
    /**
     * Retrieves a method from the reactive model and applies it as the subscription
     * fuunction to the target observable property storing its subscription in
     * the model subscription array.
     */
    private linkSubscriptions;
}
