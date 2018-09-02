/**
 * @module metadata
 */
import { Selector } from 'reselect';
import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
export declare const SELECTOR_FUNCTION = "Selector Function";
export interface SelectorPayload extends DecoratorPayload {
    /**
     * A selector function to be used in conjunction with an NgRx store.
     */
    selector: Selector<any, any>;
}
export declare class SelectorMetadata {
    payload: SelectorPayload;
    readonly type: string;
    constructor(payload: SelectorPayload);
}
/**
 * Handles SelectorMetada by applying the selector to the provided
 * ngrx store
 */
export declare class SelectorFunctionHandler implements MetadataHandler {
    /**
     * Uses the supplied selector function and passes it to the store
     * observable storing the resultant observable value at the property
     * the decorator is applied to.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the selector function
     */
    handle(model: ReactiveModel, propertyName: string, payload: SelectorPayload): void;
}
