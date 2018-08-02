import 'reflect-metadata';
import { isObservable, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { pipeFromArray } from '../../utils';
import { HandlerFactory, MetadataHandler } from '../handler';
import {
  AllMetadata,
  Callable,
  CREATION_OPERATOR,
  CreationOperatorMetadata,
  CreationOperatorPayload,
  INIT_OPERATOR,
  InitOperatorMetadata,
  InitOperatorPayload,
  MAP_TO_OPERATOR,
  MapToOperatorMetadata,
  MapToOperatorPayload,
  MONO_OPERATOR,
  MONO_OPERATOR_LIST,
  MonoOperatorFn,
  MonoOperatorListMetadata,
  MonoOperatorListPayload,
  MonoOperatorMetadata,
  MonoOperatorPayload,
  MULTI_OPERATOR,
  MultiOperatorMetadata,
  MultiOperatorPayload,
  NEXT_OPERATOR,
  NextOperatorMetadata,
  NextOperatorPayload,
  PROP_METADATA,
  PropertyMetadataContainer,
  SELECTOR_FUNCTION,
  SelectorMetadata,
  SelectorPayload,
} from '../metadata';
import { ReactiveModel } from './../reactive-model';
import {
  checkType,
  DifferentOperatorAndFunctionCountError,
  FunctionDoesNotExistError,
  NoStoreProvidedError,
  PropertyDoesNotExistError,
  PropertyIsNotObservableError,
} from './errors';

export class PropertyDataRetriever {
  constructor(private model: ReactiveModel, store?: any) {}

  public retrieve() {
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
    const handler: MetadataHandler = new HandlerFactory().create(current.type);
    handler.handle(this.model, propertyName, current.payload);
  };
}

//   private selectPropertyDecoratorHandlers = (propertyName: string) => (current: AllMetadata) => {

//     switch (current.type) {
//       case MONO_OPERATOR:
//         handleMonoOperator.bind(this.model)(propertyName, current.payload);
//         break;
//       case CREATION_OPERATOR:
//         handleCreationOperator.bind(this.model)(propertyName, current.payload);
//         break;
//       case MULTI_OPERATOR:
//         handleMultiOperator.bind(this.model)(propertyName, current.payload);
//         break;
//       case MAP_TO_OPERATOR:
//         handleMapToOperator.bind(this.model)(propertyName, current.payload);
//         break;
//       case MONO_OPERATOR_LIST:
//         handleMonoOperatorList.bind(this.model)(propertyName, current.payload);
//         break;
//       case SELECTOR_FUNCTION:
//         handleSelectorFunction.bind(this.model)(propertyName, current.payload);
//         break;
//       case NEXT_OPERATOR:
//         handleNextFunction.bind(this.model)(propertyName, current.payload);
//         break;
//       case INIT_OPERATOR:
//         handleInitOperator.bind(this.model)(propertyName, current.payload);
//     }
//   };

// }

// const getterFactory = (context: ReactiveModel) => (name: string) => {
//   return context[name];
// }

// const setterFactory = (context: ReactiveModel, name: string) => (value: any) => {
//   context[name] = value

// }

// function handleInitOperator(propertyName, payload: InitOperatorPayload) {
//   const { name, observable } = payload;

//   if (!observable || !isObservable(observable)) {
//     throw new Error('Observable was undefined');
//   }

//   const set = setterFactory(this, propertyName);

//   set(observable);

// }

// function handleNextFunction(propertyName: string, payload: NextOperatorPayload) {
//   const { subjectName, name } = payload;

//   const get = getterFactory(this);
//   const set = setterFactory(this, propertyName);

//   const subject: Subject<any> = get(subjectName);

//   const error = checkType(this, subject, subjectName, name);

//   if (error) {
//     throw error;
//   }

//   const obs = get(propertyName).pipe(tap(x => subject.next(x)));

//   set(obs);
// }

// function handleSelectorFunction(propertyName: string, payload: SelectorPayload) {
//   const { selector } = payload;

//   if (!this.store) {
//     throw new NoStoreProvidedError(this, propertyName);
//   }

//   const set = setterFactory(this, propertyName);

//   set(this.store.select(selector));
// }

// const isNotCorrectFunctionCount = (operators: MonoOperatorFn[], fns: Callable[]) => operators.length !== fns.length

// const applyOperatorsWith = (fns: Callable[]) => (operator: MonoOperatorFn, index: number) => operator(fns[index]);

// function handleMonoOperatorList(propertyName: string, payload: MonoOperatorListPayload) {
//   const { operators, fns, name } = payload;

//   const get = getterFactory(this);
//   const set = setterFactory(this, propertyName);

//   if (isNotCorrectFunctionCount(operators, fns)) {
//     throw new DifferentOperatorAndFunctionCountError(this, propertyName, name);
//   }

//   const observable = get(propertyName);

//   const error = checkType(this, observable, propertyName, name);

//   if (error) {
//     throw error;
//   }

//   const pipeline = pipeFromArray(operators.map(applyOperatorsWith(fns)));

//   set(pipeline(observable));
// }

// function handleMapToOperator(propertyName: string, payload: MapToOperatorPayload) {
//   const { functionName, operator, name } = payload;

//   const get = getterFactory(this);
//   const set = setterFactory(this, propertyName);

//   const currentObs = get(propertyName);
//   const currentFn = get(functionName);

//   const error = checkType(this, currentObs, propertyName, name);

//   if (error) {
//     throw error;
//   }

//   if (!currentFn) {
//     throw new FunctionDoesNotExistError(this, functionName, name);
//   }

//   const updatedObs = currentObs.pipe(operator(currentFn.bind(this)));

//   set(updatedObs);
// }

// const allParametersExist = (that) => (property: string) => {

//   const get = getterFactory(that);

//   const observable = get(property);

//   const error = checkType(this, observable, property, name);

//   if (error) {
//     throw error;
//   }

//   return observable;
// }

// function handleMultiOperator(propertyName: string, payload: MultiOperatorPayload) {
//   const { name, operator, parameters } = payload;

//   const get = getterFactory(this);
//   const set = setterFactory(this, propertyName);

//   const args: Observable<any>[] = parameters.map(allParametersExist(this));

//   const error = checkType(this, get(propertyName), propertyName, name);

//   if (error) {
//     throw error;
//   }

//   const observable: Observable<any> = get(propertyName).pipe(operator(...args));

//   set(observable);
// }

// function handleCreationOperator(propertyName: string, payload: CreationOperatorPayload) {

//   const { name, operator, parameters } = payload;

//   const get = getterFactory(this);
//   const set = setterFactory(this, propertyName);

//   const toCombine: Observable<any>[] = parameters.map(allParametersExist(this));

//   const currentObs = get(propertyName);

//   if (currentObs && isObservable(currentObs)) {
//     toCombine.unshift(currentObs);
//   }

//   set(operator(...toCombine));
// }

// function handleMonoOperator(propertyName: string, payload: MonoOperatorPayload) {
//   const { operator, name, isBound } = payload;
//   let fn = payload.fn;

//   const get = getterFactory(this);
//   const set = setterFactory(this, propertyName);

//   const observable: Observable<any> = get(propertyName);

//   if (isBound && typeof fn === 'function') {
//     fn = fn.bind(this);
//   }

//   const error = checkType(this, observable, propertyName, name);

//   if (error) {
//     throw error;
//   }

//   set(observable.pipe(operator(fn)));
// }
