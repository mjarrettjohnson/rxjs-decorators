/**
 * @module creation
 */
/**
 *
 * Applies a series of property names within a classes metadata based on the applied methods
 * property key. At runtime this function is used as a subscription to all properties previously mentioned.
 *
 * @example
 *
 * export class DecoratorDemo extends ReactiveModel {
 *
 *   seconds$ = interval(1000); *
 *
 *   constructor() {
 *     super();
 *     This.initialize();
 *   }
 *
 *   Subscribe('seconds$')
 *   logSecond(second: number) {
 *     console.log(second);
 *   }
 * }
 *
 * @param propertyNames a list of observable properties on a reactive model.
 *
 * @see ReactiveModel
 */
export declare const createSubscriptionDecorator: (...propertyNames: string[]) => (target: object, key: string) => void;
