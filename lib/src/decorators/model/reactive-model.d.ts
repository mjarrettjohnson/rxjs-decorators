/**
 * @module model
 */
import { Observable, Subscription } from 'rxjs';
import { Fn } from '../metadata';
/**
 * All classes that have decorators attached to them must extend
 * ReactiveModel. This class is responsible for retrieving and
 * handling all associated metadata as well as managing RXJS
 * subscriptions.
 */
export declare class ReactiveModel {
    store?: any;
    /**
     * A list of subscriptions to be destroyed
     */
    subscriptions: Subscription[];
    /**
     * Responsible for retriving all and handling all attached property metadata
     */
    private propertyHandler;
    /**
     * Responsible for retrieving and handling all attached subscription metadata
     */
    private subscriptionHandler;
    constructor(store?: any);
    /**
     * Retrieves and applies all metadata to the reactive model observables before
     * retrieving and applying the subscription metadata.
     */
    protected initialize(): void;
    /**
     * Unsubscribes from all active subscriptions
     */
    protected destroy(): void;
    /**
     * Retrieves all subscription metadata and resubscribes to
     * the associated observables.
     */
    protected resubscribe(): void;
}
/**
 * Returns a function that when given a property name will return the observable stored on the model
 * at that location
 * @param model a reactive model that a decorator is applied to
 */
export declare const getObservableFactory: (model: ReactiveModel) => (name: string) => Observable<any>;
/**
 * Returns a function that when given a property name will return the function stored on the model
 * at that location
 * @param model a reactive model that a decorator is applied to
 */
export declare const getFunctionFactory: (model: ReactiveModel) => (name: string) => Fn;
/**
 * Returns a function that when given an observable will store it at the property name provided.
 * @param model the reactive model the decorator is applied to
 * @param name the name of the property
 */
export declare const setterFactory: (model: ReactiveModel, name: string) => (value: Observable<any>) => void;
/**
 * Returns a function that when provided a property will determine if it exists on
 * the model AND is an observable. Used to map over a list of properties.
 * @param model the reactive model
 */
export declare const allParametersExist: (model: ReactiveModel) => (property: string) => Observable<any>;
