import { DecoratorPayload } from '../creation';
import { ReactiveModel } from '../model';
import { MetadataHandler } from './metadata-handler';
export declare const NEXT_OPERATOR = "Next Operator";
export interface NextOperatorPayload extends DecoratorPayload {
    /**
     * The name of the reactive model subject to next a value onto.
     */
    subjectName: string;
}
export declare class NextOperatorMetadata {
    payload: NextOperatorPayload;
    readonly type: string;
    constructor(payload: NextOperatorPayload);
}
/**
 * Handles NextOperatorHandler by calling next on the reactive model subject stored at the
 * supplied property name.
 */
export declare class NextOperatorhandler implements MetadataHandler {
    /**
     * Retrieves the subject defined at the subject name and passes
     * all data flowing through the current observable pipeline to it.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the next operator payload
     */
    handle(model: ReactiveModel, propertyName: string, payload: NextOperatorPayload): void;
}
