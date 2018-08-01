import { Observable, isObservable, Subscription } from 'rxjs';
import { pipeFromArray } from '../utils';
import {
  SubscriptionMetadataContainer,
  SUBSCRIPTION_METADATA,
  SubscriptionMetadata,
  PropertyMetadataContainer,
  PROP_METADATA,
  AllMetadata,
  MONO_OPERATOR,
  CREATION_OPERATOR,
  MULTI_OPERATOR,
  MAP_TO_OPERATOR,
  MONO_OPERATOR_LIST,
  SELECTOR_FUNCTION,
  SelectorMetadata,
  MonoOperatorListMetadata,
  MonoOperatorFn,
  MapToOperatorMetadata,
  MultiOperatorMetadata,
  CreationOperatorMetadata,
  MonoOperatorMetadata
} from '../metadata';
import { NoStoreProvidedError, DifferentOperatorAndFunctionCountError, FunctionDoesNotExistError, PropertyDoesNotExistError, PropertyIsNotObservableError } from './errors';
import { PropertyDataHandler } from './property-handler';
import { SubscriptionDataHandler } from './subscription-handler';

export class ReactiveModel {

  subscriptions: Subscription[] = [];

  private propertyHandler: PropertyDataHandler
  private subscriptionHandler: SubscriptionDataHandler;

  constructor(store?: any) {
    this.propertyHandler = new PropertyDataHandler(this, store);
    this.subscriptionHandler = new SubscriptionDataHandler(this);
  }

  protected initialize() {
    this.propertyHandler.apply();
    this.subscriptionHandler.apply();
  }

  protected destroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected resubscribe() {
    this.subscriptionHandler.apply();
  }
}
