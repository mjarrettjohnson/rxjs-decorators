import { MonoOperatorFn, CallableFn } from "./mono-operator";
export declare const MONO_OPERATOR_LIST = "Mono Operator List";
export interface MonoOperatorListPayload {
    operators: MonoOperatorFn[];
    name: string;
    fns: CallableFn[];
}
export declare class MonoOperatorListMetadata {
    payload: MonoOperatorListPayload;
    readonly type: string;
    constructor(payload: MonoOperatorListPayload);
}
//# sourceMappingURL=mono-operator-list.d.ts.map