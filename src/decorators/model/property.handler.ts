/**
 * @module model
 */

import 'reflect-metadata';
import { AllMetadata, MetadataHandler, PROP_METADATA, PropertyMetadataContainer } from '../metadata';
import { HandlerFactory } from './handler-factory';
import { ReactiveModel } from './reactive-model';

/**
 * Retrieves the property metadata that has been applied to a reactive model and
 * determines how to handle the metadata.
 */
export class PropertyMetadataHandler {
  /**
   * @param model the reactive model
   * @param store an NgRx Store
   */
  constructor(private model: ReactiveModel, store?: any) {}

  /**
   * Retrieves all property metadata and handles each piece of metadata found
   */
  public handle(): void {
    const metadata: PropertyMetadataContainer = Reflect.getMetadata(PROP_METADATA, this.model);

    if (!metadata) {
      return;
    }

    Object.keys(metadata).forEach(this.handlePropertyMetadata(metadata));
  }

  /**
   * Returns a function that when given a key will handle the metadata located at that key
   * @param metadata the retrieved metadata
   */
  private handlePropertyMetadata = (metadata: PropertyMetadataContainer) => (metadataKey: string): void => {
    const propertyMetadata: AllMetadata[] = metadata[metadataKey];

    propertyMetadata.forEach(this.selectPropertyDecoratorHandler(metadataKey));
  };

  /**
   * Retruns a function that when given a metadata context will call the correct
   * metadata handler
   * @param propertyName the property the decorator is applied to
   */
  private selectPropertyDecoratorHandler = (propertyName: string) => (current: AllMetadata): void => {
    const handler: MetadataHandler = new HandlerFactory().create(current.type);
    handler.handle(this.model, propertyName, current.payload);
  };
}
