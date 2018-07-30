import { PROP_METADATA, SELECTOR_METADATA, SUBSCRIPTION_METADATA, COMBINATION_METADATA } from './metadata';
import 'reflect-metadata';
import { UnaryFunction, OperatorFunction, Subscribable } from 'rxjs';
import { Operator } from 'rxjs/internal/Operator';


export const createSubscriptionDecorator = (propertyName: string) => (target: object, key: string) => {
  const existingMeta = Reflect.getMetadata(SUBSCRIPTION_METADATA, target) || {};

  existingMeta[propertyName] ? existingMeta[propertyName].push(target[key]) : (existingMeta[propertyName] = [target[key]]);

  Reflect.defineMetadata(SUBSCRIPTION_METADATA, existingMeta, target);
}

export interface CombinationMetaData<T, K> {
  secondObservable: string[]
  operator: Operator<T, K>
}

export interface MetaData {
  operator: any;
  combinator: CombinationMetaData<any, any>
}

export const createMultiStreamDecorator = <T, K>(operator: Operator<T, K>, ...propertyName: string[]) => (target: Object, key: string) => {
  const existingMeta: { [k: string]: MetaData[] } = Reflect.getMetadata(COMBINATION_METADATA, target) || {};

  const data = {
    secondObservable: propertyName,
    operator
  }

  existingMeta[key].push({ combinator: data, operator: null });

  Reflect.defineMetadata(PROP_METADATA, existingMeta, target);
}


const createPropertyDecorator = <T, K>(operator: UnaryFunction<T, K>, metadata: string, ...propertyName: string[]) => (
  target: object,
  key: string
) => {
  const existingMeta = Reflect.getMetadata(PROP_METADATA, target) || {} as MetaData;

  let currentData: MetaData[] = existingMeta[key]

  let newData: MetaData

  const t = operator;

  if (metadata === COMBINATION_METADATA) {
    newData = {
      operator: null,
      combinator: {
        secondObservable: propertyName,
        operator: t,
      }
    }
  } else {
    newData = { operator, combinator: null };
  }
  if (existingMeta[key]) {
    existingMeta[key] = [].concat(existingMeta[key], newData);
  } else {
    existingMeta[key] = [newData];
  }

  Reflect.defineMetadata(PROP_METADATA, existingMeta, target);

};




function createMethodDecorator<T, K>(operator: OperatorFunction<T, K>): MethodDecorator {
  return function (target: any, key: string, descriptor: any) {
    const func = descriptor.value;

    descriptor.value = function () {
      return func().pipe(operator);
    };

    return descriptor;
  };
}

function createAccessorDecorator<T, K>(operator: OperatorFunction<T, K>): MethodDecorator {
  return function (target: any, key: string, descriptor: any) {
    const func = descriptor.get;

    descriptor.get = function () {
      return func().pipe(operator);
    };

    return descriptor;
  };
}


export const createDecorator = (operator: UnaryFunction<any, any>, metadata?: string, ...propertyName: string[]) => (...args: any[]) => {
  args = args.filter(t => !!t);
  switch (args.length) {
    case 1:
      return () => { };
    case 2:

      if (!metadata) {
        metadata = PROP_METADATA;
      }
      createPropertyDecorator(operator, metadata || PROP_METADATA, ...propertyName).apply(this, args);
      break;
    case 3:
      return args[2].get
        ? createAccessorDecorator(operator).apply(this, args)
        : createMethodDecorator(operator).apply(this, args);
    default:
      throw new Error('Decorators are not valid here!');
  }
};
