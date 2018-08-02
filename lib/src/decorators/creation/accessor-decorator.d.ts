import { MonoOperatorMetadata } from '../metadata';
export declare class IncorrectDecoratorType extends Error {
    constructor(message: string, context: any, property: string, decorator: string);
}
export declare function createAccessorDecorator<T, K>(metadata: MonoOperatorMetadata): MethodDecorator;
