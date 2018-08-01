import { MonoOperatorMetadata } from "./mono-operator";
import { CreationOperatorMetadata } from './creation-operator';
import { MultiOperatorMetadata } from "./multi-operator";
import { MapToOperatorMetadata } from "./map-to-operator";
import { SubscriptionMetadata } from "./subscription";
import { SelectorMetadata } from "./selectors";
import { MonoOperatorListMetadata } from './mono-operator-list';
import { NextOperatorMetadata } from "./next-operator";
import { InitOperatorMetadata } from "./initialize-operator";

export const PROP_METADATA = '__props__';
export const SUBSCRIPTION_METADATA = '__subscriptions__';

export type AllMetadata =
  | MonoOperatorMetadata
  | CreationOperatorMetadata
  | MultiOperatorMetadata
  | MapToOperatorMetadata
  | MonoOperatorListMetadata
  | SubscriptionMetadata
  | SelectorMetadata
  | NextOperatorMetadata
  | InitOperatorMetadata;


export interface PropertyMetadataContainer {
  [key: string]: AllMetadata[];
}

export * from './creation-operator';
export * from './map-to-operator';
export * from './mono-operator';
export * from './mono-operator-list';
export * from './multi-operator';
export * from './selectors';
export * from './subscription';
export * from './next-operator';
export * from './initialize-operator'
