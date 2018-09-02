/**
 * @module metadata
 */
import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
import { Callable, MonoOperatorFn } from './mono-operator';
export declare const MONO_OPERATOR_LIST = "Mono Operator List";
export interface MonoOperatorListPayload extends DecoratorPayload {
    /**
     * A list of single argument rxjs operators
     */
    operators: MonoOperatorFn[];
    /**
     * fns that will be mapped by index to an operator
     */
    fns: Callable[];
}
/**
 * A metadata type that stores an observable onto a property
 * of a reactive model.
 */
export declare class MonoOperatorListMetadata {
    payload: MonoOperatorListPayload;
    readonly type: string;
    constructor(payload: MonoOperatorListPayload);
}
/**
 * Handles MonoOperatorListMetadata by applying the supplied functions to
 * the supplied operators to build a pipeline.
 */
export declare class MonoOperatorListHandler implements MetadataHandler {
    /**
     * For each operator applies the index equivalent function to the operator.
     * Builds an observable pipeline by applying all operators before finally attaching
     * it to the reactive model observable.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to.
     * @param payload the list of functions and operators
     */
    handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorListPayload): void;
    /**
     * Returns true if an equal number of operators and functions has been provided
     * @param operators a list of rxjs operators
     * @param fns a list of functions
     */
    private isNotCorrectFunctionCount;
    /**
     * Returns a function that maps overa list of operators an applies the index equivalent function to
     * the current operator
     * @param fns a list functions
     */
    private applyOperatorsWith;
}
