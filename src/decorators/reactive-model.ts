import { Observable } from '../../node_modules/rxjs';
import {
  AllMetadata,
  CreationOperatorMetadata,
  CREATION_OPERATOR,
  MapToOperatorMetadata,
  MAP_TO_OPERATOR,
  MonoOperator,
  MonoOperatorListMetadata,
  MonoOperatorMetadata,
  MONO_OPERATOR,
  MONO_OPERATOR_LIST,
  MultiOperatorMetadata,
  MULTI_OPERATOR,
  PropertyMetadataContainer,
  PROP_METADATA,
  SELECTOR_FUNCTION,
  SelectorMetadata,
} from './creation/create-property-decorator';
import {
  SubscriptionMetadata,
  SubscriptionMetadataContainer,
  SUBSCRIPTION_METADATA,
} from './creation/create-subscription-decorator';
import { isObservable, pipeFromArray } from './utils';

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

export class ReactiveModel {


  constructor(private _store?: any) {}

  protected initialize() {
    this.applyPropertyDecorators();
    this.applySubscriptions();

  }


  private applySubscriptions() {
    const metadata: SubscriptionMetadataContainer = Reflect.getMetadata(SUBSCRIPTION_METADATA, this);

    if (!metadata) {
      return;
    }

    Object.keys(metadata).forEach(this.handleSubscriptionMetadata(metadata));
  }

  private handleSubscriptionMetadata = (metadata: SubscriptionMetadataContainer) => (metadataKey: string) => {
    const subscriptionMetadata: SubscriptionMetadata[] = metadata[metadataKey];

    subscriptionMetadata.forEach(this.linkSubscriptions(metadataKey));
  };

  private linkSubscriptions = (fnName: string) => (current: SubscriptionMetadata) => {
    const { propName } = current;

    this.checkType(this[propName], propName, 'Subscribe');

    this[propName].subscribe(this[fnName].bind(this));
  };

  private applyPropertyDecorators() {
    const metadata: PropertyMetadataContainer = Reflect.getMetadata(PROP_METADATA, this);

    if (!metadata) {
      return;
    }

    Object.keys(metadata).forEach(this.handlePropertyMetadata(metadata));
  }

  private handlePropertyMetadata = (metadata: PropertyMetadataContainer) => (metadataKey: string) => {
    const propertyMetadata: AllMetadata[] = metadata[metadataKey];

    propertyMetadata.forEach(this.selectPropertyDecoratorHandler(metadataKey));
  };

  private selectPropertyDecoratorHandler = (propertyName: string) => (current: AllMetadata) => {
    switch (current.type) {
      case MONO_OPERATOR:
        this.handleMonoOperator(propertyName, current);
        break;
      case CREATION_OPERATOR:
        this.handleCreationOperator(propertyName, current);
        break;
      case MULTI_OPERATOR:
        this.handleMultiOperator(propertyName, current);
        break;
      case MAP_TO_OPERATOR:
        this.handleMapToOperator(propertyName, current);
        break;
      case MONO_OPERATOR_LIST:
        this.handleMonoOperatorList(propertyName, current);
        break;
      case SELECTOR_FUNCTION:
        this.handleSelectorFunction(propertyName, current);
        break;
    }
  };

  private handleSelectorFunction(propertyName: string, current: SelectorMetadata) {
    if (!this._store) {
      throw new NoStoreProvidedError(this, propertyName);
    }
    this[propertyName] = this._store.select(current.payload.selector);
  }

  private handleMonoOperatorList(propertyName: string, current: MonoOperatorListMetadata) {
    const { operators, fns, name } = current.payload;

    if (operators.length !== fns.length) {
      throw new DifferentOperatorAndFunctionCountError(this, propertyName, name);
    }

    const observable = this[propertyName];

    this.checkType(observable, propertyName, name);

    const combined = operators.map((op: MonoOperator, index: number) => {
      return op(fns[index]);
    });

    this[propertyName] = pipeFromArray(combined)(observable);
  }

  private handleMapToOperator(propertyName: string, current: MapToOperatorMetadata) {
    const currentObs = this[propertyName];
    const currentFn = this[current.payload.functionName];

    this.checkType(currentObs, propertyName, current.payload.name);

    if (!currentFn) {
      throw new FunctionDoesNotExistError(this, current.payload.functionName, current.payload.name);
    }

    this[propertyName] = currentObs.pipe(current.payload.operator(currentFn.bind(this)));
  }

  private handleMultiOperator(propertyName: string, current: MultiOperatorMetadata) {
    const args: Observable<any>[] = current.payload.parameters.map(objectKey => {
      const observable = this[objectKey];

      this.checkType(observable, objectKey, current.payload.name);

      return observable;
    });

    const mainObs: Observable<any> = this[propertyName];

    this.checkType(mainObs, propertyName, current.payload.name);

    this[propertyName] = this[propertyName].pipe(current.payload.operator(...args));
  }

  private handleCreationOperator(propertyName: string, current: CreationOperatorMetadata) {
    const toCombine: Observable<any>[] = current.payload.parameters.map(objectKey => {
      const observable = this[objectKey];

      this.checkType(observable, objectKey, current.payload.name);
      return observable;
    });

    const currentObs = this[propertyName];
    if (currentObs && isObservable(currentObs)) {
      toCombine.unshift(this[propertyName]);
    }

    this[propertyName] = current.payload.operator(...toCombine);
  }

  private handleMonoOperator(propertyName: string, current: MonoOperatorMetadata) {
    const { operator, name, isBound } = current.payload;
    let fn = current.payload.fn;
    const observable: Observable<any> = this[propertyName];

    if (isBound) {
      fn = fn.bind(this);
    }

    this.checkType(observable, propertyName, name);

    this[propertyName] = observable.pipe(operator(fn));
  }

  private checkType(observable: any, propertyName: string, decorator: string) {
    if (!observable) {
      throw new PropertyDoesNotExistError(this, propertyName, decorator);
    }

    if (!isObservable(observable)) {
      throw new PropertyIsNotObservableError(this, propertyName, decorator);
    }
    return true;
  }
}
