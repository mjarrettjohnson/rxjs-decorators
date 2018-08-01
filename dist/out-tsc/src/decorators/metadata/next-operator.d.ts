export declare const NEXT_OPERATOR = "Next Operator";
export interface NextOperatorPayload {
    subjectName: string;
    name: string;
}
export declare class NextOperatorMetadata {
    payload: NextOperatorPayload;
    readonly type: string;
    constructor(payload: NextOperatorPayload);
}
