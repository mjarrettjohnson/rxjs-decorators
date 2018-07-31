import 'reflect-metadata';
import { PropertyMetadataContainer, PROP_METADATA, AllMetadata, SelectorMetadata, MonoOperatorListMetadata, MonoOperatorFn, MapToOperatorMetadata, MultiOperatorMetadata, CreationOperatorMetadata, MonoOperatorMetadata, MONO_OPERATOR, CREATION_OPERATOR, MULTI_OPERATOR, MAP_TO_OPERATOR, MONO_OPERATOR_LIST, SELECTOR_FUNCTION } from "../metadata";
import { NoStoreProvidedError, DifferentOperatorAndFunctionCountError, FunctionDoesNotExistError, PropertyDoesNotExistError, PropertyIsNotObservableError } from "./errors";
import { Observable } from "rxjs";
import { isObservable, pipeFromArray } from "../utils";
import { ReactiveModel, checkType } from "./reactive-model";


export class PropertyDataHandler {

  constructor(private model: ReactiveModel, private store?: any) { };

  public apply() {
    const metadata: PropertyMetadataContainer = Reflect.getMetadata(PROP_METADATA, this.model);

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
        handleMonoOperator.call(this.model, propertyName, current);
        break;
      case CREATION_OPERATOR:
        handleCreationOperator.call(this.model, propertyName, current);
        break;
      case MULTI_OPERATOR:
        handleMultiOperator.call(this.model, propertyName, current);
        break;
      case MAP_TO_OPERATOR:
        handleMapToOperator.call(this.model, propertyName, current);
        break;
      case MONO_OPERATOR_LIST:
        handleMonoOperatorList.call(this.model, propertyName, current);
        break;
      case SELECTOR_FUNCTION:
        handleSelectorFunction.call(this.model, propertyName, current);
        break;
    }
  };

}

function handleSelectorFunction(propertyName: string, current: SelectorMetadata) {
  if (!this._store) {
    throw new NoStoreProvidedError(this, propertyName);
  }
  this[propertyName] = this._store.select(current.payload.selector);
}

function handleMonoOperatorList(propertyName: string, current: MonoOperatorListMetadata) {
  const { operators, fns, name } = current.payload;

  if (operators.length !== fns.length) {
    throw new DifferentOperatorAndFunctionCountError(this, propertyName, name);
  }

  const observable = this[propertyName];

  const error = checkType(this.model, observable, propertyName, name);

  if (error) {
    throw error;
  }

  const combined = operators.map((op: MonoOperatorFn, index: number) => {
    return op(fns[index]);
  });

  this[propertyName] = pipeFromArray(combined)(observable);
}

function handleMapToOperator(propertyName: string, current: MapToOperatorMetadata) {
  const currentObs = this[propertyName];
  const currentFn = this[current.payload.functionName];

  const error = checkType(this.model, currentObs, propertyName, name);

  if (error) {
    throw error;
  }

  if (!currentFn) {
    throw new FunctionDoesNotExistError(this, current.payload.functionName, current.payload.name);
  }

  this[propertyName] = currentObs.pipe(current.payload.operator(currentFn.bind(this)));
}

function handleMultiOperator(propertyName: string, current: MultiOperatorMetadata) {
  const args: Observable<any>[] = current.payload.parameters.map(objectKey => {
    const observable = this[objectKey];

    const error = checkType(this.model, observable, propertyName, name);

    if (error) {
      throw error;
    }

    return observable;
  });

  const mainObs: Observable<any> = this[propertyName];

  const error = checkType(this.model, mainObs, propertyName, name);

  if (error) {
    throw error;
  }

  this[propertyName] = this[propertyName].pipe(current.payload.operator(...args));
}

function handleCreationOperator(propertyName: string, current: CreationOperatorMetadata) {
  const toCombine: Observable<any>[] = current.payload.parameters.map(objectKey => {
    const observable = this[objectKey];

    const error = checkType(this.model, observable, propertyName, name);

    if (error) {
      throw error;
    }

    return observable;
  });

  const currentObs = this[propertyName];
  if (currentObs && isObservable(currentObs)) {
    toCombine.unshift(this[propertyName]);
  }

  this[propertyName] = current.payload.operator(...toCombine);
}

function handleMonoOperator(propertyName: string, current: MonoOperatorMetadata) {
  const { operator, name, isBound } = current.payload;
  let fn = current.payload.fn;
  const observable: Observable<any> = this[propertyName];

  if (isBound) {
    fn = fn.bind(this);
  }

  const error = checkType(this.model, observable, propertyName, name);

  if (error) {
    throw error;
  }

  this[propertyName] = observable.pipe(operator(fn));
}
