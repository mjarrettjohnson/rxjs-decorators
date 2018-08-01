import { UnaryFunction } from 'rxjs';
export declare const propertyExists: (o: object, key: string) => boolean;
export declare function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R>;
export declare function noop(): void;
