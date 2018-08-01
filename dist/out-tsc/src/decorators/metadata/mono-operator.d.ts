import { UnaryFunction } from 'rxjs';
export declare const MONO_OPERATOR = "Mono Operator";
export declare type MonoOperatorFn = (...args: any[]) => UnaryFunction<any, any>;
export declare type Callable = ((...args: any[]) => any) | string | number | undefined;
export interface MonoOperatorPayload {
    operator: MonoOperatorFn;
    name: string;
    fn: Callable;
    isBound?: boolean;
}
export declare class MonoOperatorMetadata {
    payload: MonoOperatorPayload;
    readonly type: string;
    constructor(payload: MonoOperatorPayload);
}
