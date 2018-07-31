import 'reflect-metadata';
import { Observable, ObservableInput, OperatorFunction, UnaryFunction } from 'rxjs';
import { propertyExists } from '../utils';
import { Selector } from 'reselect';
import { SubscriptionMetadata } from './create-subscription-decorator';

export const PROP_METADATA = '__props__';

export const MONO_OPERATOR = 'Mono Operator';
export const MONO_OPERATOR_LIST = 'Mono Operator List';
export const CREATION_OPERATOR = 'Creation Operator';
export const MULTI_OPERATOR = 'Multi Operator';
export const MAP_TO_OPERATOR = 'Map to operator';
export const SELECTOR_FUNCTION = 'Selector Function';

export enum PropertyMetadataType {}

export interface PropertyMetadataContainer {
  [key: string]: AllMetadata[];
}

export type MonoOperator = (...args: any[]) => UnaryFunction<any, any>;

export type CallableFunction = (...args: any[]) => any;

export interface MonoOperatorPayload {
  operator: MonoOperator;
  name: string;
  fn: CallableFunction;
  isBound?: boolean;
}

export class MonoOperatorMetadata {
  readonly type = MONO_OPERATOR;

  constructor(public payload: MonoOperatorPayload) {}
}

export interface MonoOperatorListPayload {
  operators: MonoOperator[];
  name: string;
  fns: CallableFunction[];
}

export class MonoOperatorListMetadata {
  readonly type = MONO_OPERATOR_LIST;

  constructor(public payload: MonoOperatorListPayload) {}
}

export type CreationOperator = (...observable: Observable<any>[]) => Observable<any>;

export interface CreationOperatorPayload {
  operator: CreationOperator;
  parameters: string[];
  name: string;
}

export class CreationOperatorMetadata {
  readonly type = CREATION_OPERATOR;

  constructor(public payload: CreationOperatorPayload) {}
}

export type MultiOperator = (...array: ObservableInput<any>[]) => OperatorFunction<any, any>;

export interface MultiOperatorPayload {
  operator: MultiOperator;
  parameters: string[];
  name: string;
}

export class MultiOperatorMetadata {
  readonly type = MULTI_OPERATOR;

  constructor(public payload: MultiOperatorPayload) {}
}

export interface MapToOperatorPayload {
  operator: MonoOperator;
  functionName: string;
  name: string;
}

export class MapToOperatorMetadata {
  readonly type = MAP_TO_OPERATOR;

  constructor(public payload: MapToOperatorPayload) {}
}

export interface SelectorPayload {
  selector: Selector<any, any>;
}

export class SelectorMetadata {
  readonly type = SELECTOR_FUNCTION;

  constructor(public payload: SelectorPayload) {}
}

export type AllMetadata =
  | MonoOperatorMetadata
  | CreationOperatorMetadata
  | MultiOperatorMetadata
  | MapToOperatorMetadata
  | MonoOperatorListMetadata
  | SubscriptionMetadata
  | SelectorMetadata;

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
