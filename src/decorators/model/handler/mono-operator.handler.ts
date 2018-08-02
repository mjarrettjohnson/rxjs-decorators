import { Observable } from 'rxjs';
import { MonoOperatorPayload } from '../../metadata';
import { checkType } from '../errors';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { getterFactory, setterFactory } from './utils';

export class MonoOperatorHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorPayload) {
    const { operator, name, isBound } = payload;
    let fn = payload.fn;

    const get = getterFactory(model);
    const set = setterFactory(model, propertyName);

    const observable: Observable<any> = get(propertyName);

    if (isBound && typeof fn === 'function') {
      fn = fn.bind(this);
    }

    const error = checkType(model, observable, propertyName, name);

    if (error) {
      throw error;
    }

    set(observable.pipe(operator(fn)));
  }
}
