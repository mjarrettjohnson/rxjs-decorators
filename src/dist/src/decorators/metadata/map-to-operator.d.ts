import { MonoOperatorFn } from "./mono-operator";
export declare const MAP_TO_OPERATOR = "Map to operator";
export interface MapToOperatorPayload {
    operator: MonoOperatorFn;
    functionName: string;
    name: string;
}
export declare class MapToOperatorMetadata {
    payload: MapToOperatorPayload;
    readonly type: string;
    constructor(payload: MapToOperatorPayload);
}
//# sourceMappingURL=map-to-operator.d.ts.map