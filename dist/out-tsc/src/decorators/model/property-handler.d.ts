import 'reflect-metadata';
import { ReactiveModel } from "./reactive-model";
export declare class PropertyDataHandler {
    private model;
    private store?;
    constructor(model: ReactiveModel, store?: any);
    apply(): void;
    private handlePropertyMetadata;
    private selectPropertyDecoratorHandler;
}
