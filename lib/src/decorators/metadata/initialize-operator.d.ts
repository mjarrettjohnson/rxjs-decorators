/**
 * @module metadata
 */
import { Observable } from 'rxjs';
import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
export declare const INIT_OPERATOR = "Initialize Operator";
/**
 * This operator stores an observable in the decorated
 * property. Useful for initializing decoration streams.
 */
export interface InitOperatorPayload extends DecoratorPayload {
    /**
     * An observable to store in the decorated property.
     */
    observable: Observable<any>;
}
/**
 *
 * A metadata type that stores an observable onto a property
 * of a reactive model. Used to initialize a stream.
 *
 */
export declare class InitOperatorMetadata {
    payload: InitOperatorPayload;
    readonly type: string;
    constructor(payload: InitOperatorPayload);
}
/**
 * Handles all InitOperatorMetadata applied to a ReactiveModel.
 */
export declare class InitOperatorHandler implements MetadataHandler {
    /**
     * Retrieves the observable stored in the metadata payload
     * and sets the value of the property to that observable.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the init operator payload
     */
    handle(model: ReactiveModel, propertyName: any, payload: InitOperatorPayload): void;
}
