import { Selector } from 'reselect';
export declare const SELECTOR_FUNCTION = "Selector Function";
export interface SelectorPayload {
    selector: Selector<any, any>;
}
export declare class SelectorMetadata {
    payload: SelectorPayload;
    readonly type: string;
    constructor(payload: SelectorPayload);
}
