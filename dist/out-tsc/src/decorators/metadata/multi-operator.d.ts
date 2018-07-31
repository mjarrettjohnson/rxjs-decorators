import { ObservableInput, OperatorFunction } from 'rxjs';
export declare const MULTI_OPERATOR = "Multi Operator";
export declare type MultiOperator = (...array: ObservableInput<any>[]) => OperatorFunction<any, any>;
export interface MultiOperatorPayload {
    operator: MultiOperator;
    parameters: string[];
    name: string;
}
export declare class MultiOperatorMetadata {
    payload: MultiOperatorPayload;
    readonly type: string;
    constructor(payload: MultiOperatorPayload);
}
