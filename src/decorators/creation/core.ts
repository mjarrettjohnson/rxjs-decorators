/**
 * @module creation
 */
import { AllMetadata, CREATION_OPERATOR, MONO_OPERATOR, MULTI_OPERATOR, SUBSCRIPTION_FUNCTION } from '../metadata';
import { createAccessorDecorator } from './accessor-decorator';
import { createMethodDecorator } from './method-decorator';
import { createPropertyDecorator } from './property-decorator';
import { createSubscriptionDecorator } from './subscription-decorator';

/**
 * Error that is thrown when the wrong type of operator is
 * applied to method decorator.
 */
export class InvalidMetadataForDecoratorError extends Error {
  constructor() {
    super();
    this.message = 'Invalid metadata for this decorator';
  }
}

/**
 * Currently unused.
 */
export class CannotSubscribeToPropertyError extends Error {
  constructor() {
    super();
    this.message = 'Cannot apply the subscribe decorator to a property';
  }
}

/**
 * An error that is thrown when a decorator is applied to
 * a class.
 */
export class NoClassDecoratorsAllowedError extends Error {
  constructor() {
    super();
    this.message = 'Cannot apply decorators to classes';
  }
}

export interface DecoratorPayload {
  /**
   * the name of the decorator
   */
  name: string;
}

/**
 * Determines if a the class property is a getter by checking if a
 * property with a get function exists.
 *
 * @param args the property associated with the decorator location
 */
const isGetter = (args: any[]) => !!args[2].get;

/**
 * Stores context information in a classes metadata. This is used to provide a list
 * of rxjs operators and functions / data that is stored until the class has been
 * instantiated.
 *
 * These are then applied to an observable that is stored in the
 * property.
 *
 *
 * @param metadata function context that has been passed via a property decorator
 * @param args the arguments that were passed from the decorator itself.
 */
const handlePropertyDecorator = (metadata: AllMetadata, ...args: any[]) => {
  if (metadata.type === SUBSCRIPTION_FUNCTION) {
    metadata.payload.push(args[1]);
  }
  createPropertyDecorator(metadata).apply(this, args);
};

/**
 *
 * Stores context information in a classes metadata. This is used to provide a list
 * of rxjs operators and functions / data that is stored until the class has been
 * instantiated.
 *
 * @param metadata function context that has been passed via a method decorator
 * @param args the arguments that were passed from the decorator itself.
 */
const handleFunctionalDecorator = (metadata: AllMetadata, ...args: any[]): any => {
  switch (metadata.type) {
    case MONO_OPERATOR:
      return isGetter(args)
        ? createAccessorDecorator(metadata).apply(this, args)
        : createMethodDecorator(metadata).apply(this, args);
    case SUBSCRIPTION_FUNCTION:
      return createSubscriptionDecorator(...metadata.payload).apply(this, args);
    case MULTI_OPERATOR:
    case CREATION_OPERATOR:
      throw new InvalidMetadataForDecoratorError();
  }
};

/**
 *
 * Stores Context information in a classes metadata. This information is stored via
 * the property key that the decorator is applied to.
 *
 * When a class is instantiated a corresponding
 * metadata handler is created which take the provided metadata and applies it to the
 * property (be that property, accessor or method).
 *
 * Class handlers exist for each metadata type which know the way to retrieve and use this
 * context.
 *
 * @example export interface MonoOperatorPayload {
 *  operator: MonoOperatorFn;
 *  name: string;
 *  fn: Callable;
 *  isBound?: boolean;
 * }
 *
 * export class MonoOperatorHandler implements MetadataHandler {
 *  handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorPayload) {
 *    const { operator, name, isBound } = payload;
 *    let fn = payload.fn;
 *
 *    // returns a function that when given a property name will retrieve it from the provided model
 *    const get = getterFactory(model);
 *
 *    // returns a function that when given a model and property name will store a provided parameter there
 *    const set = setterFactory(model, propertyName);
 *
 *    const observable: Observable<any> = get(propertyName);
 *
 *
 *    if (isBound && typeof fn === 'function') {
 *      fn = fn.bind(this);
 *    }
 *
 *    const error = checkType(model, observable, propertyName, name);
 *
 *    if (error) {
 *      throw error;
 *    }
 *
 *    set(observable.pipe(operator(fn)));
 *   }
 * }
 *
 * @param metadata object that contains the information you wish to store
 * in a classes metadata.
 * @param args the arguments that are supplied to a decorator function that
 * vary depending on what type of decorator is being created
 */
export const createDecorator = (metadata: AllMetadata) => (...args: any[]) => {
  args = args.filter(t => !!t);
  switch (args.length) {
    case 1:
      throw new NoClassDecoratorsAllowedError();
    case 2:
      return handlePropertyDecorator(metadata, ...args);
    case 3:
      return handleFunctionalDecorator(metadata, ...args);
    default:
      throw new Error('Decorators are not valid here!');
  }
};
