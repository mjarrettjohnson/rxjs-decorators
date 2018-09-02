/**
 * @module model
 */
import 'reflect-metadata';
import { ReactiveModel } from './reactive-model';
/**
 * Retrieves the property metadata that has been applied to a reactive model and
 * determines how to handle the metadata.
 */
export declare class PropertyMetadataHandler {
    private model;
    /**
     * @param model the reactive model
     * @param store an NgRx Store
     */
    constructor(model: ReactiveModel, store?: any);
    /**
     * Retrieves all property metadata and handles each piece of metadata found
     */
    handle(): void;
    /**
     * Returns a function that when given a key will handle the metadata located at that key
     * @param metadata the retrieved metadata
     */
    private handlePropertyMetadata;
    /**
     * Retruns a function that when given a metadata context will call the correct
     * metadata handler
     * @param propertyName the property the decorator is applied to
     */
    private selectPropertyDecoratorHandler;
}
