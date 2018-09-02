/**
 * @module model
 */
import { isObservable } from 'rxjs';
import { ReactiveModel } from './reactive-model';

/**
 * Thrown when a decorator is applied to an undefined property.
 */
export class PropertyDoesNotExistError extends Error {
  constructor(context: ReactiveModel, property: string, decorator: string) {
    super();
    this.message = `PropertyDoesNotExistError
     ------------------------------
     Class: ${context.constructor.name}
     Property: ${property}
     Decorator: ${decorator}
     Message: Property is undefined
     ------------------------------`;
  }
}

/**
 * Thrown when a decorator is applied to a non observable property.
 */
export class PropertyIsNotObservableError extends Error {
  constructor(context: ReactiveModel, property: string, decorator: string) {
    super();
    this.message = `PropertyIsNotObservableError
     ------------------------------
     Class: ${context.constructor.name}
     Property: ${property}
     Decorator: ${decorator}
     Message: Property is not an observable
     ------------------------------
    `;
  }
}
/**
 * Thrown when a function does not exist on a reactive model at the property provided.
 */
export class FunctionDoesNotExistError extends Error {
  constructor(context: ReactiveModel, property: string, decorator: string) {
    super();
    this.message = `FunctionDoesNotExistError
     ------------------------------
     Class: ${context.constructor.name}
     Function: ${property}
     Decorator: ${decorator}
     Message: Function does not exist
     ------------------------------
    `;
  }
}

/**
 * Thrown when a different number of operators and operator functions has
 * been supplied
 */
export class DifferentOperatorAndFunctionCountError extends Error {
  constructor(context: ReactiveModel, property: string, decorator: string) {
    super();
    this.message = `DifferentOperatorAndFunctionCountError
     ------------------------------
     Class: ${context.constructor.name}
     Function: ${property}
     Decorator: ${decorator}
     Message: You have supplied a different number of operator and callable functions
     ------------------------------
    `;
  }
}

/**
 * Thrown when the selector decorator is used by no NgRx Store
 * has been injected.
 */
export class NoStoreProvidedError extends Error {
  constructor(context: ReactiveModel, property: string) {
    super();
    this.message = `NoStoreProvidedError
     ------------------------------
     Class: ${context.constructor.name}
     Function: ${property}
     Message: You have tried to call a selector function without providing the store
     ------------------------------
    `;
  }
}

/**
 * Throws an error if the retrieved property does not exist or is
 * not an observable.
 *
 * @param model the reactive model to check
 * @param observable the observable that was retrieved from the model
 * @param propertyName the property that was used to retrieve the observable
 * @param decorator the decorator that was used.
 */
export function checkType(model: ReactiveModel, observable: any, propertyName: string, decorator: string) {
  if (!observable) {
    return new PropertyDoesNotExistError(model, propertyName, decorator);
  }

  if (!isObservable(observable)) {
    return new PropertyIsNotObservableError(model, propertyName, decorator);
  }
  return null;
}
