/**
 * @module creation
 */

import 'reflect-metadata';
import { AllMetadata, PROP_METADATA, PropertyMetadataContainer } from '../metadata';
import { propertyExists } from '../utils';

/**
 * Stores the necessary context information in the classes metadata via the property
 * the decorator is attached to. At runtime this context information is retrieved and
 * used by a custom built handler.
 *
 * @see createDecorator
 *
 * @param payload context information that is used by the associated metadata handler
 */
export const createPropertyDecorator = (payload: AllMetadata) => (target: object, key: string) => {
  const metadata = Reflect.getMetadata(PROP_METADATA, target) || ({} as PropertyMetadataContainer);

  if (!propertyExists(metadata, key)) {
    metadata[key] = [payload];
  } else {
    metadata[key] = [...metadata[key], payload];
  }

  Reflect.defineMetadata(PROP_METADATA, metadata, target);
};
