import 'reflect-metadata';
import { ReactiveModel } from './../reactive-model';
export declare class PropertyDataRetriever {
    private model;
    constructor(model: ReactiveModel, store?: any);
    retrieve(): void;
    private handlePropertyMetadata;
    private selectPropertyDecoratorHandler;
}
