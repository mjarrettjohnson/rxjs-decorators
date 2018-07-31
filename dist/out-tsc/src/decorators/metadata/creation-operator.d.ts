import { Observable } from 'rxjs';
export declare const CREATION_OPERATOR = "Creation Operator";
export declare type CreationOperator = (...observable: Observable<any>[]) => Observable<any>;
export interface CreationOperatorPayload {
    operator: CreationOperator;
    parameters: string[];
    name: string;
}
export declare class CreationOperatorMetadata {
    payload: CreationOperatorPayload;
    readonly type: string;
    constructor(payload: CreationOperatorPayload);
}
