/**
 * @module creation
 */
import { MonoOperatorMetadata } from '../metadata';
/**
 * An error that is thrown if an observable is not returned
 * from a method that a decorator is applied to
 */
export declare class InvalidReturnType extends Error {
    constructor(message: string, context: any, property: string, decorator: string);
}
/**
 *
 * Returns a decorator that will evaluate the decorated method
 * and apply a single rxjs operator and corresponding function / data
 * to its return.
 *
 * @param {MonoOperatorMetadata} metadata the method context
 */
export declare function createMethodDecorator(metadata: MonoOperatorMetadata): any;
