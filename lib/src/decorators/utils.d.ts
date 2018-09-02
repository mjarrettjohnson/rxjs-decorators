/**
 * @module utils
 */
import { UnaryFunction } from 'rxjs';
/**
 * Determines if a property exists on a supplied object
 * @param o the object that the property is meant to exist on
 * @param key the property name
 */
export declare const propertyExists: (o: object, key: string) => boolean;
/**
 * Creates a Pipelin from an array of operators. Taken from rxjs/internals
 * @param fns a list of rxjs operators
 */
export declare function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R>;
export declare function noop(): void;
