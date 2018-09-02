/**
 * @module metadata
 */

import { CreationOperatorMetadata, CreationOperatorPayload } from './creation-operator';
import { InitOperatorMetadata, InitOperatorPayload } from './initialize-operator';
import { MapToOperatorMetadata, MapToOperatorPayload } from './map-to-operator';
import { MonoOperatorMetadata, MonoOperatorPayload } from './mono-operator';
import { MonoOperatorListMetadata, MonoOperatorListPayload } from './mono-operator-list';
import { MultiOperator, MultiOperatorMetadata, MultiOperatorPayload } from './multi-operator';
import { NextOperatorMetadata, NextOperatorPayload } from './next-operator';
import { SelectorMetadata, SelectorPayload } from './selectors';
import { SubscriptionMetadata, SubscriptionMetadataPayload } from './subscription';

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

export type MetadataPayload =
  | MonoOperatorPayload
  | CreationOperatorPayload
  | MultiOperatorPayload
  | MapToOperatorPayload
  | MonoOperatorListPayload
  | SubscriptionMetadataPayload
  | SelectorPayload
  | NextOperatorPayload
  | InitOperatorPayload;

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
export * from './initialize-operator';
export * from './metadata-handler';
