import { ReactiveModel } from './reactive-model';
/**
 * Thrown when a decorator is applied to an undefined property.
 */
export declare class PropertyDoesNotExistError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
/**
 * Thrown when a decorator is applied to a non observable property.
 */
export declare class PropertyIsNotObservableError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
/**
 * Thrown when a function does not exist on a reactive model at the property provided.
 */
export declare class FunctionDoesNotExistError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
/**
 * Thrown when a different number of operators and operator functions has
 * been supplied
 */
export declare class DifferentOperatorAndFunctionCountError extends Error {
    constructor(context: ReactiveModel, property: string, decorator: string);
}
/**
 * Thrown when the selector decorator is used by no NgRx Store
 * has been injected.
 */
export declare class NoStoreProvidedError extends Error {
    constructor(context: ReactiveModel, property: string);
}
/**
 * Throws an error if the retrieved property does not exist or is
 * not an observable.
 *
 * @param model the reactive model to check
 * @param observable the observable that was retrieved from the model
 * @param propertyName the property that was used to retrieve the observable
 * @param decorator the decorator that was used.
 */
export declare function checkType(model: ReactiveModel, observable: any, propertyName: string, decorator: string): PropertyDoesNotExistError | PropertyIsNotObservableError;
