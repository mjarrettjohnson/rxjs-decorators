/**
 * @module model
 */
import { Observable, Subscription } from 'rxjs';
import { Fn } from '../metadata';
import { checkType } from './errors';
import { PropertyMetadataHandler } from './property.handler';
import { SubscriptionMetadataHandler } from './subscription.handler';

/**
 * All classes that have decorators attached to them must extend
 * ReactiveModel. This class is responsible for retrieving and
 * handling all associated metadata as well as managing RXJS
 * subscriptions.
 */
export class ReactiveModel {
  /**
   * A list of subscriptions to be destroyed
   */
  subscriptions: Subscription[] = [];

  /**
   * Responsible for retriving all and handling all attached property metadata
   */
  private propertyHandler: PropertyMetadataHandler;

  /**
   * Responsible for retrieving and handling all attached subscription metadata
   */
  private subscriptionHandler: SubscriptionMetadataHandler;

  constructor(public store?: any) {
    this.propertyHandler = new PropertyMetadataHandler(this, store);
    this.subscriptionHandler = new SubscriptionMetadataHandler(this);
  }

  /**
   * Retrieves and applies all metadata to the reactive model observables before
   * retrieving and applying the subscription metadata.
   */
  protected initialize() {
    this.propertyHandler.handle();
    this.subscriptionHandler.handle();
  }

  /**
   * Unsubscribes from all active subscriptions
   */
  protected destroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Retrieves all subscription metadata and resubscribes to
   * the associated observables.
   */
  protected resubscribe() {
    this.subscriptionHandler.handle();
  }
}

/**
 * Returns a function that when given a property name will return the observable stored on the model
 * at that location
 * @param model a reactive model that a decorator is applied to
 */
export const getObservableFactory = (model: ReactiveModel) => (name: string): Observable<any> => {
  return model[name];
};

/**
 * Returns a function that when given a property name will return the function stored on the model
 * at that location
 * @param model a reactive model that a decorator is applied to
 */
export const getFunctionFactory = (model: ReactiveModel) => (name: string): Fn => {
  return model[name];
};

/**
 * Returns a function that when given an observable will store it at the property name provided.
 * @param model the reactive model the decorator is applied to
 * @param name the name of the property
 */
export const setterFactory = (model: ReactiveModel, name: string) => (value: Observable<any>): void => {
  model[name] = value;
};

/**
 * Returns a function that when provided a property will determine if it exists on
 * the model AND is an observable. Used to map over a list of properties.
 * @param model the reactive model
 */
export const allParametersExist = (model: ReactiveModel) => (property: string): Observable<any> => {
  const get = getObservableFactory(model);

  const observable = get(property) as Observable<any>;

  const error = checkType(this, observable, property, name);

  if (error) {
    throw error;
  }

  return observable;
};
