import { Observable } from 'rxjs';
import { isObservable, pipeFromArray } from '../utils';
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

// private applyPropertyDecorators() {
//   const metadata: PropertyMetadataContainer = Reflect.getMetadata(PROP_METADATA, this);

//   if (!metadata) {
//     return;
//   }

//   Object.keys(metadata).forEach(this.handlePropertyMetadata(metadata));
// }

// private handlePropertyMetadata = (metadata: PropertyMetadataContainer) => (metadataKey: string) => {
//   const propertyMetadata: AllMetadata[] = metadata[metadataKey];

//   propertyMetadata.forEach(this.selectPropertyDecoratorHandler(metadataKey));
// };

// private selectPropertyDecoratorHandler = (propertyName: string) => (current: AllMetadata) => {
//   switch (current.type) {
//     case MONO_OPERATOR:
//       this.handleMonoOperator(propertyName, current);
//       break;
//     case CREATION_OPERATOR:
//       this.handleCreationOperator(propertyName, current);
//       break;
//     case MULTI_OPERATOR:
//       this.handleMultiOperator(propertyName, current);
//       break;
//     case MAP_TO_OPERATOR:
//       this.handleMapToOperator(propertyName, current);
//       break;
//     case MONO_OPERATOR_LIST:
//       this.handleMonoOperatorList(propertyName, current);
//       break;
//     case SELECTOR_FUNCTION:
//       this.handleSelectorFunction(propertyName, current);
//       break;
//   }
// };

// private handleSelectorFunction(propertyName: string, current: SelectorMetadata) {
//   if (!this._store) {
//     throw new NoStoreProvidedError(this, propertyName);
//   }
//   this[propertyName] = this._store.select(current.payload.selector);
// }

// private handleMonoOperatorList(propertyName: string, current: MonoOperatorListMetadata) {
//   const { operators, fns, name } = current.payload;

//   if (operators.length !== fns.length) {
//     throw new DifferentOperatorAndFunctionCountError(this, propertyName, name);
//   }

//   const observable = this[propertyName];

//   this.checkType(observable, propertyName, name);

//   const combined = operators.map((op: MonoOperatorFn, index: number) => {
//     return op(fns[index]);
//   });

//   this[propertyName] = pipeFromArray(combined)(observable);
// }

// private handleMapToOperator(propertyName: string, current: MapToOperatorMetadata) {
//   const currentObs = this[propertyName];
//   const currentFn = this[current.payload.functionName];

//   this.checkType(currentObs, propertyName, current.payload.name);

//   if (!currentFn) {
//     throw new FunctionDoesNotExistError(this, current.payload.functionName, current.payload.name);
//   }

//   this[propertyName] = currentObs.pipe(current.payload.operator(currentFn.bind(this)));
// }

// private handleMultiOperator(propertyName: string, current: MultiOperatorMetadata) {
//   const args: Observable<any>[] = current.payload.parameters.map(objectKey => {
//     const observable = this[objectKey];

//     this.checkType(observable, objectKey, current.payload.name);

//     return observable;
//   });

//   const mainObs: Observable<any> = this[propertyName];

//   this.checkType(mainObs, propertyName, current.payload.name);

//   this[propertyName] = this[propertyName].pipe(current.payload.operator(...args));
// }

// private handleCreationOperator(propertyName: string, current: CreationOperatorMetadata) {
//   const toCombine: Observable<any>[] = current.payload.parameters.map(objectKey => {
//     const observable = this[objectKey];

//     this.checkType(observable, objectKey, current.payload.name);
//     return observable;
//   });

//   const currentObs = this[propertyName];
//   if (currentObs && isObservable(currentObs)) {
//     toCombine.unshift(this[propertyName]);
//   }

//   this[propertyName] = current.payload.operator(...toCombine);
// }

// private handleMonoOperator(propertyName: string, current: MonoOperatorMetadata) {
//   const { operator, name, isBound } = current.payload;
//   let fn = current.payload.fn;
//   const observable: Observable<any> = this[propertyName];

//   if (isBound) {
//     fn = fn.bind(this);
//   }

//   this.checkType(observable, propertyName, name);

//   this[propertyName] = observable.pipe(operator(fn));
// }

// private checkType(observable: any, propertyName: string, decorator: string) {
//   if (!observable) {
//     throw new PropertyDoesNotExistError(this, propertyName, decorator);
//   }

//   if (!isObservable(observable)) {
//     throw new PropertyIsNotObservableError(this, propertyName, decorator);
//   }
//   return true;
// }