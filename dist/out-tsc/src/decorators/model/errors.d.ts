import { ReactiveModel } from "./reactive-model";
export declare function checkType(model: ReactiveModel, observable: any, propertyName: string, decorator: string): PropertyDoesNotExistError | PropertyIsNotObservableError;
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
