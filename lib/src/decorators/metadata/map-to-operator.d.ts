/**
 * @module metadata
 */
import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
import { MonoOperatorFn } from './mono-operator';
export declare const MAP_TO_OPERATOR = "Map to operator";
/**
 * Represents the context required to apply an existing method
 * on the reactive model to the supplied operator.
 */
export interface MapToOperatorPayload extends DecoratorPayload {
    /**
     * The rxjs operator to apply
     */
    operator: MonoOperatorFn;
    /**
     * the method to provide as the operators function
     */
    methodName: string;
}
/**
 *
 * A metadata type that applies a reactive model method
 * to a rxjs operator
 *
 * @see MapToOperatorHandler
 */
export declare class MapToOperatorMetadata {
    payload: MapToOperatorPayload;
    readonly type: string;
    constructor(payload: MapToOperatorPayload);
}
/**
 * Handles MapToOperatorMetadata. Applies an existing method on a
 * Reactive Model to the provided operator
 */
export declare class MapToOperatorHandler implements MetadataHandler {
    /**
     * Retrieves the reactive model's method and applies it to the
     * provided rxjs operator
     *
     * @param model the reactive model that the decorator was applied to
     * @param propertyName the property that the decorator was applied to
     * @param payload the map to operator payload
     */
    handle(model: ReactiveModel, propertyName: string, payload: MapToOperatorPayload): void;
}
