import { isObservable } from 'rxjs';
import { ReactiveModel } from './reactive-model';

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

export function checkType(model: ReactiveModel, observable: any, propertyName: string, decorator: string) {
  if (!observable) {
    return new PropertyDoesNotExistError(model, propertyName, decorator);
  }

  if (!isObservable(observable)) {
    return new PropertyIsNotObservableError(model, propertyName, decorator);
  }
  return null;
}
