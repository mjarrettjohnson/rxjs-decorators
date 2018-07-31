import { ReactiveModel } from "./reactive-model";
export declare class PropertyDoesNotExistError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
export declare class PropertyIsNotObservableError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
export declare class FunctionDoesNotExistError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
export declare class DifferentOperatorAndFunctionCountError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
export declare class NoStoreProvidedError extends Error {
    constructor(context: ReactiveModel, property: string);
}
//# sourceMappingURL=errors.d.ts.map