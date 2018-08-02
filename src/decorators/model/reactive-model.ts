import { isObservable, Observable, Subscription } from 'rxjs';
import {
  AllMetadata,
  CREATION_OPERATOR,
  CreationOperatorMetadata,
  MAP_TO_OPERATOR,
  MapToOperatorMetadata,
  MONO_OPERATOR,
  MONO_OPERATOR_LIST,
  MonoOperatorFn,
  MonoOperatorListMetadata,
  MonoOperatorMetadata,
  MULTI_OPERATOR,
  MultiOperatorMetadata,
  PROP_METADATA,
  PropertyMetadataContainer,
  SELECTOR_FUNCTION,
  SelectorMetadata,
  SUBSCRIPTION_METADATA,
  SubscriptionMetadata,
  SubscriptionMetadataContainer,
} from '../metadata';
import { pipeFromArray } from '../utils';
import {
  DifferentOperatorAndFunctionCountError,
  FunctionDoesNotExistError,
  NoStoreProvidedError,
  PropertyDoesNotExistError,
  PropertyIsNotObservableError,
} from './errors';
import { PropertyDataRetriever, SubscriptionDataRetriever } from './retriever';

export class ReactiveModel {
  subscriptions: Subscription[] = [];

  private propertyRetriever: PropertyDataRetriever;
  private subscriptionRetriever: SubscriptionDataRetriever;

  constructor(public store?: any) {
    this.propertyRetriever = new PropertyDataRetriever(this, store);
    this.subscriptionRetriever = new SubscriptionDataRetriever(this);
  }

  protected initialize() {
    this.propertyRetriever.retrieve();
    this.subscriptionRetriever.retrieve();
  }

  protected destroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected resubscribe() {
    this.subscriptionRetriever.retrieve();
  }
}
