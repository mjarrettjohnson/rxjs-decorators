/**
 * @module metadata
 */
import { UnaryFunction } from 'rxjs';
import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
export declare const MONO_OPERATOR = "Mono Operator";
export declare type MonoOperatorFn = (...args: any[]) => UnaryFunction<any, any>;
export declare type Fn = (...args: any[]) => any;
export declare type Callable = Fn | string | number | undefined;
export interface MonoOperatorPayload extends DecoratorPayload {
    /**
     * A single arity rxjs operator.
     */
    operator: MonoOperatorFn;
    /**
     * The function | string | number to apply to the operator
     */
    fn: Callable;
    /**
     * Determines if the this value is bound to the function
     */
    isBound?: boolean;
}
export declare class MonoOperatorMetadata {
    payload: MonoOperatorPayload;
    readonly type: string;
    constructor(payload: MonoOperatorPayload);
}
/**
 * Handles MonoOperatorMetadata by piping the supplied operator and
 * arguments to the observable that the decorator is applied to.
 */
export declare class MonoOperatorHandler implements MetadataHandler {
    /**
     * Pipes the operator with its supplied arguments onto the observable
     * that is returned by accessing the model at the supplied property name.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the operator and arguments
     */
    handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorPayload): void;
}
