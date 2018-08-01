import { Observable } from 'rxjs';
export declare const INIT_OPERATOR = "Initialize Operator";
export interface InitOperatorPayload {
    observable: Observable<any>;
    name: string;
}
export declare class InitOperatorMetadata {
    payload: InitOperatorPayload;
    readonly type: string;
    constructor(payload: InitOperatorPayload);
}
