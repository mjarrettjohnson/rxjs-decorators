/**
 * @module creation
 */
import { MonoOperatorMetadata } from '../metadata';
export interface GetterDescriptor {
    get: () => any;
    [key: string]: any;
}
/**
 * An error that is applied when an accessor decorator is applied to a function.
 *
 */
export declare class IncorrectDecoratorType extends Error {
    /**
     *
     * @param message the error message to dispaly
     * @param context the class that the decorator was applied to
     * @param property the property that the decorator was applied to
     * @param decorator the name of the decorator.
     */
    constructor(message: string, context: any, property: string, decorator: string);
}
/**
 * Applies an rxjs operator to a getter that returns an observable
 *
 * @param metadata a decorator payload that is the context for the decorator
 */
export declare function createAccessorDecorator(metadata: MonoOperatorMetadata): any;
