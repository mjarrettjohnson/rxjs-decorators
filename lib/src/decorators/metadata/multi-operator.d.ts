/**
 * @module metadata
 */
import { ObservableInput, OperatorFunction } from 'rxjs';
import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
export declare const MULTI_OPERATOR = "Multi Operator";
export declare type MultiOperator = (...array: Array<ObservableInput<any>>) => OperatorFunction<any, any>;
export interface MultiOperatorPayload extends DecoratorPayload {
    /**
     * a multi argument rxjs operator
     */
    operator: MultiOperator;
    /**
     * the arguments to be supplied to the attahed operator
     */
    operatorArgs: string[];
}
export declare class MultiOperatorMetadata {
    payload: MultiOperatorPayload;
    readonly type: string;
    constructor(payload: MultiOperatorPayload);
}
/**
 * Handles MultiOperatorMetadata by applying the supplied operator args
 * to the rxjs operator and piping it onto the property observable
 */
export declare class MultiOperatorHandler implements MetadataHandler {
    /**
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the multi operator payload.
     */
    handle(model: ReactiveModel, propertyName: string, payload: MultiOperatorPayload): void;
}
