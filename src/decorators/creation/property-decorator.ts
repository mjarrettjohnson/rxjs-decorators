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

// const createPropertyDecorator = <T, K>(operator: UnaryFunction<T, K>, metadata: string, ...propertyName: string[]) => (
//   target: object,
//   key: string
// ) => {
//   const existingMeta = Reflect.getMetadata(PROP_METADATA, target) || {} as MetaData;

//   let currentData: MetaData[] = existingMeta[key]

//   let newData: MetaData

//   const t = operator;

//   if (metadata === COMBINATION_METADATA) {
//     newData = {
//       operator: null,
//       combinator: {
//         secondObservable: propertyName,
//         operator: t,
//       }
//     }
//   } else {
//     newData = { operator, combinator: null };
//   }
//   if (existingMeta[key]) {
//     existingMeta[key] = [].concat(existingMeta[key], newData);
//   } else {
//     existingMeta[key] = [newData];
//   }

//   Reflect.defineMetadata(PROP_METADATA, existingMeta, target);

// };
