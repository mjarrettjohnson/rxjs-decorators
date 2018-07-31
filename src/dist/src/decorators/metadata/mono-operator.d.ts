import { UnaryFunction } from 'rxjs';
export declare const MONO_OPERATOR = "Mono Operator";
export declare type MonoOperatorFn = (...args: any[]) => UnaryFunction<any, any>;
export declare type CallableFn = (...args: any[]) => any;
export interface MonoOperatorPayload {
    operator: MonoOperatorFn;
    name: string;
    fn: CallableFn;
    isBound?: boolean;
}
export declare class MonoOperatorMetadata {
    payload: MonoOperatorPayload;
    readonly type: string;
    constructor(payload: MonoOperatorPayload);
}
//# sourceMappingURL=mono-operator.d.ts.map