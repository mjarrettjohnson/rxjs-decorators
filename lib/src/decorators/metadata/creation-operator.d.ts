/**
 * @module metadata
 */
import { Observable } from 'rxjs';
import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
export declare const CREATION_OPERATOR = "Creation Operator";
export declare type CreationOperator = (...observable: Array<Observable<any>>) => Observable<any>;
/**
 * This metadata payload is used to  apply TO a rxjs creation operator
 * (i.e. combineLatest, withLatestFrom, merge) a list of observables that
 * are passed where the decorator is applied.
 *
 */
export interface CreationOperatorPayload extends DecoratorPayload {
    /**
     * The rxjs creation operator to apply
     */
    operator: CreationOperator;
    /**
     * A list of properties on the reactive model to combine
     */
    observableProperties: string[];
}
/**
 * A metadata type that stores context data regarding rxjs creation
 * operators
 *
 */
export declare class CreationOperatorMetadata {
    payload: CreationOperatorPayload;
    readonly type: string;
    constructor(payload: CreationOperatorPayload);
}
/**
 * Handles CreationOperator Metadata by applying the associated rxjs
 * creation operator to the provided observable(s)
 */
export declare class CreationOperatorHandler implements MetadataHandler {
    /**
     * Retrieves all observables properties and applies the rxjs creation operator
     * to them. The property the decorator applied to can be undefined or be
     * an observable itself. If it is an observable it will be included in the
     * operator.
     *
     * @param model the reactive model the decorator was applied to
     * @param propertyName the property the decorator was applied to
     * @param payload the decorator payload
     */
    handle(model: ReactiveModel, propertyName: string, payload: CreationOperatorPayload): void;
}
