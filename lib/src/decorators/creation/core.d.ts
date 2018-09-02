/**
 * @module creation
 */
import { AllMetadata } from '../metadata';
/**
 * Error that is thrown when the wrong type of operator is
 * applied to method decorator.
 */
export declare class InvalidMetadataForDecoratorError extends Error {
    constructor();
}
/**
 * Currently unused.
 */
export declare class CannotSubscribeToPropertyError extends Error {
    constructor();
}
/**
 * An error that is thrown when a decorator is applied to
 * a class.
 */
export declare class NoClassDecoratorsAllowedError extends Error {
    constructor();
}
export interface DecoratorPayload {
    /**
     * the name of the decorator
     */
    name: string;
}
/**
 *
 * Stores Context information in a classes metadata. This information is stored via
 * the property key that the decorator is applied to.
 *
 * When a class is instantiated a corresponding
 * metadata handler is created which take the provided metadata and applies it to the
 * property (be that property, accessor or method).
 *
 * Class handlers exist for each metadata type which know the way to retrieve and use this
 * context.
 *
 * @example export interface MonoOperatorPayload {
 *  operator: MonoOperatorFn;
 *  name: string;
 *  fn: Callable;
 *  isBound?: boolean;
 * }
 *
 * export class MonoOperatorHandler implements MetadataHandler {
 *  handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorPayload) {
 *    const { operator, name, isBound } = payload;
 *    let fn = payload.fn;
 *
 *    // returns a function that when given a property name will retrieve it from the provided model
 *    const get = getterFactory(model);
 *
 *    // returns a function that when given a model and property name will store a provided parameter there
 *    const set = setterFactory(model, propertyName);
 *
 *    const observable: Observable<any> = get(propertyName);
 *
 *
 *    if (isBound && typeof fn === 'function') {
 *      fn = fn.bind(this);
 *    }
 *
 *    const error = checkType(model, observable, propertyName, name);
 *
 *    if (error) {
 *      throw error;
 *    }
 *
 *    set(observable.pipe(operator(fn)));
 *   }
 * }
 *
 * @param metadata object that contains the information you wish to store
 * in a classes metadata.
 * @param args the arguments that are supplied to a decorator function that
 * vary depending on what type of decorator is being created
 */
export declare const createDecorator: (metadata: AllMetadata) => (...args: any[]) => any;
