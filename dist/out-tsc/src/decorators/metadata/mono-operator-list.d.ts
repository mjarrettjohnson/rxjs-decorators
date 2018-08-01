import { MonoOperatorFn, Callable } from "./mono-operator";
export declare const MONO_OPERATOR_LIST = "Mono Operator List";
export interface MonoOperatorListPayload {
    operators: MonoOperatorFn[];
    name: string;
    fns: Callable[];
}
export declare class MonoOperatorListMetadata {
    payload: MonoOperatorListPayload;
    readonly type: string;
    constructor(payload: MonoOperatorListPayload);
}
