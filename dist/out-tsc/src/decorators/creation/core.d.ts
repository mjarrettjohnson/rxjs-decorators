import { AllMetadata } from '../metadata';
export declare class InvalidMetadataForDecoratorError extends Error {
    constructor();
}
export declare class CannotSubscribeToPropertyError extends Error {
    constructor();
}
export declare class NoClassDecoratorsAllowedError extends Error {
    constructor();
}
export declare const createDecorator: (metadata: AllMetadata) => (...args: any[]) => any;
