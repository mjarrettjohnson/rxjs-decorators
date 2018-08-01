import 'reflect-metadata';
import { PropertyMetadataContainer, PROP_METADATA, AllMetadata, SelectorMetadata, MonoOperatorListMetadata, MonoOperatorFn, MapToOperatorMetadata, MultiOperatorMetadata, CreationOperatorMetadata, MonoOperatorMetadata, MONO_OPERATOR, CREATION_OPERATOR, MULTI_OPERATOR, MAP_TO_OPERATOR, MONO_OPERATOR_LIST, SELECTOR_FUNCTION, NEXT_OPERATOR, NextOperatorMetadata, NextOperatorPayload, SelectorPayload, MonoOperatorListPayload, Callable, MapToOperatorPayload, MultiOperatorPayload, CreationOperatorPayload, MonoOperatorPayload, INIT_OPERATOR, InitOperatorMetadata, InitOperatorPayload } from "../metadata";
import { NoStoreProvidedError, DifferentOperatorAndFunctionCountError, FunctionDoesNotExistError, PropertyDoesNotExistError, PropertyIsNotObservableError, checkType } from "./errors";
import { Observable, isObservable, Subject } from "rxjs";
import { pipeFromArray } from "../utils";
import { ReactiveModel } from "./reactive-model";
import { tap } from 'rxjs/operators';


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
        handleMonoOperator.bind(this.model)(propertyName, current.payload);
        break;
      case CREATION_OPERATOR:
        handleCreationOperator.bind(this.model)(propertyName, current.payload);
        break;
      case MULTI_OPERATOR:
        handleMultiOperator.bind(this.model)(propertyName, current.payload);
        break;
      case MAP_TO_OPERATOR:
        handleMapToOperator.bind(this.model)(propertyName, current.payload);
        break;
      case MONO_OPERATOR_LIST:
        handleMonoOperatorList.bind(this.model)(propertyName, current.payload);
        break;
      case SELECTOR_FUNCTION:
        handleSelectorFunction.bind(this.model)(propertyName, current.payload);
        break;
      case NEXT_OPERATOR:
        handleNextFunction.bind(this.model)(propertyName, current.payload);
        break;
      case INIT_OPERATOR:
        handleInitOperator.bind(this.model)(propertyName, current.payload);
    }
  };

}

const getterFactory = (context: ReactiveModel) => (name: string) => {
  return context[name];
}

const setterFactory = (context: ReactiveModel, name: string) => (value: any) => {
  context[name] = value

}


function handleInitOperator(propertyName, payload: InitOperatorPayload) {
  const { name, observable } = payload;


  if (!observable || !isObservable(observable)) {
    throw new Error('Observable was undefined');
  }

  const set = setterFactory(this, propertyName);

  set(observable);

}

function handleNextFunction(propertyName, payload: NextOperatorPayload) {
  const { subjectName, name } = payload;

  const get = getterFactory(this);
  const set = setterFactory(this, propertyName);

  const subject: Subject<any> = get(subjectName);

  const error = checkType(this, subject, subjectName, name);

  if (error) {
    throw error;
  }

  const obs = get(propertyName).pipe(tap(x => subject.next(x)));

  set(obs);
}

function handleSelectorFunction(propertyName: string, payload: SelectorPayload) {
  const { selector } = payload;

  if (!this._store) {
    throw new NoStoreProvidedError(this, propertyName);
  }

  const set = setterFactory(this, propertyName);

  set(this._store.select(selector));
}

const isNotCorrectFunctionCount = (operators: MonoOperatorFn[], fns: Callable[]) => operators.length !== fns.length

const applyOperatorsWith = (fns: Callable[]) => (operator: MonoOperatorFn, index: number) => operator(fns[index]);

function handleMonoOperatorList(propertyName: string, payload: MonoOperatorListPayload) {
  const { operators, fns, name } = payload;

  const get = getterFactory(this);
  const set = setterFactory(this, propertyName);

  if (isNotCorrectFunctionCount(operators, fns)) {
    throw new DifferentOperatorAndFunctionCountError(this, propertyName, name);
  }

  const observable = get(propertyName);

  const error = checkType(this, observable, propertyName, name);

  if (error) {
    throw error;
  }

  const pipeline = pipeFromArray(operators.map(applyOperatorsWith(fns)));

  set(pipeline(observable));
}

function handleMapToOperator(propertyName: string, payload: MapToOperatorPayload) {
  const { functionName, operator, name } = payload;

  const get = getterFactory(this);
  const set = setterFactory(this, propertyName);

  const currentObs = get(propertyName);
  const currentFn = get(functionName);

  const error = checkType(this, currentObs, propertyName, name);

  if (error) {
    throw error;
  }

  if (!currentFn) {
    throw new FunctionDoesNotExistError(this, functionName, name);
  }

  const updatedObs = currentObs.pipe(operator(currentFn.bind(this)));

  set(updatedObs);
}

const allParametersExist = (that) => (property: string) => {

  const get = getterFactory(that);

  const observable = get(property);

  const error = checkType(this, observable, property, name);

  if (error) {
    throw error;
  }

  return observable;
}

function handleMultiOperator(propertyName: string, payload: MultiOperatorPayload) {
  const { name, operator, parameters } = payload;

  const get = getterFactory(this);
  const set = setterFactory(this, propertyName);

  const args: Observable<any>[] = parameters.map(allParametersExist(this));

  const error = checkType(this, get(propertyName), propertyName, name);

  if (error) {
    throw error;
  }

  const observable: Observable<any> = get(propertyName).pipe(operator(...args));

  set(observable);
}



function handleCreationOperator(propertyName: string, payload: CreationOperatorPayload) {

  const { name, operator, parameters } = payload;

  const get = getterFactory(this);
  const set = setterFactory(this, propertyName);

  const toCombine: Observable<any>[] = parameters.map(allParametersExist(this));

  const currentObs = get(propertyName);

  if (currentObs && isObservable(currentObs)) {
    toCombine.unshift(currentObs);
  }

  set(operator(...toCombine));
}

function handleMonoOperator(propertyName: string, payload: MonoOperatorPayload) {
  const { operator, name, isBound } = payload;
  let fn = payload.fn;


  const get = getterFactory(this);
  const set = setterFactory(this, propertyName);

  const observable: Observable<any> = get(propertyName);

  if (isBound && typeof fn === 'function') {
    fn = fn.bind(this);
  }

  const error = checkType(this, observable, propertyName, name);

  if (error) {
    throw error;
  }

  set(observable.pipe(operator(fn)));
}
