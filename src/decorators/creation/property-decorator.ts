import 'reflect-metadata';
import { Selector } from 'reselect';
import { Observable, ObservableInput, OperatorFunction, UnaryFunction } from 'rxjs';
import { AllMetadata, PROP_METADATA, PropertyMetadataContainer, SubscriptionMetadata } from '../metadata';
import { propertyExists } from '../utils';

export const createPropertyDecorator = <T, K>(payload: AllMetadata) => (target: object, key: string) => {
  const metadata = Reflect.getMetadata(PROP_METADATA, target) || ({} as PropertyMetadataContainer);

  if (!propertyExists(metadata, key)) {
    metadata[key] = [payload];
  } else {
    metadata[key] = [...metadata[key], payload];
  }

  Reflect.defineMetadata(PROP_METADATA, metadata, target);
};
