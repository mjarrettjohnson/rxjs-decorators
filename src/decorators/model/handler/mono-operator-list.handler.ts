import { Callable, MonoOperatorFn, MonoOperatorListPayload } from '../../metadata';
import { pipeFromArray } from '../../utils';
import { checkType, DifferentOperatorAndFunctionCountError } from '../errors';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { getterFactory, setterFactory } from './utils';

export class MonoOperatorListHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorListPayload) {
    const { operators, fns, name } = payload;

    const get = getterFactory(model);
    const set = setterFactory(model, propertyName);

    if (this.isNotCorrectFunctionCount(operators, fns)) {
      throw new DifferentOperatorAndFunctionCountError(model, propertyName, name);
    }

    const observable = get(propertyName);

    const error = checkType(model, observable, propertyName, name);

    if (error) {
      throw error;
    }

    const pipeline = pipeFromArray(operators.map(this.applyOperatorsWith(fns)));

    set(pipeline(observable));
  }

  private isNotCorrectFunctionCount = (operators: MonoOperatorFn[], fns: Callable[]) => operators.length !== fns.length;

  private applyOperatorsWith = (fns: Callable[]) => (operator: MonoOperatorFn, index: number) => operator(fns[index]);
}
