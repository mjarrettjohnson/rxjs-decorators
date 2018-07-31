import { MonoOperatorMetadata } from '../metadata';
export declare class InvalidReturnType extends Error {
    constructor(message: string, context: any, property: string, decorator: string);
}
export declare function createMethodDecorator<T, K>(metadata: MonoOperatorMetadata): MethodDecorator;
//# sourceMappingURL=method-decorator.d.ts.map