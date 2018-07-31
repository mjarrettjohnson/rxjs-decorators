import { MonoOperatorMetadata } from "./mono-operator";
import { CreationOperatorMetadata } from './creation-operator';
import { MultiOperatorMetadata } from "./multi-operator";
import { MapToOperatorMetadata } from "./map-to-operator";
import { SubscriptionMetadata } from "./subscription";
import { SelectorMetadata } from "./selectors";
import { MonoOperatorListMetadata } from './mono-operator-list';
export declare const PROP_METADATA = "__props__";
export declare const SUBSCRIPTION_METADATA = "__subscriptions__";
export declare type AllMetadata = MonoOperatorMetadata | CreationOperatorMetadata | MultiOperatorMetadata | MapToOperatorMetadata | MonoOperatorListMetadata | SubscriptionMetadata | SelectorMetadata;
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
//# sourceMappingURL=index.d.ts.map