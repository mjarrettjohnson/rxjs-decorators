import { checkType } from '../errors';
import { ReactiveModel } from '../reactive-model';

export const getterFactory = (model: ReactiveModel) => (name: string) => {
  return model[name];
};

export const setterFactory = (model: ReactiveModel, name: string) => (value: any) => {
  model[name] = value;
};

export const allParametersExist = that => (property: string) => {
  const get = getterFactory(that);

  const observable = get(property);

  const error = checkType(this, observable, property, name);

  if (error) {
    throw error;
  }

  return observable;
};
