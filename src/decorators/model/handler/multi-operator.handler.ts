import { Observable } from 'rxjs';
import { MetadataPayload, MultiOperatorPayload } from '../../metadata';
import { checkType } from '../errors';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { allParametersExist, getterFactory, setterFactory } from './utils';

export class MultiOperatorHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: MultiOperatorPayload) {
    const { name, operator, parameters } = payload;

    const get = getterFactory(model);
    const set = setterFactory(model, propertyName);

    const args: Array<Observable<any>> = parameters.map(allParametersExist(model));

    const error = checkType(model, get(propertyName), propertyName, name);

    if (error) {
      throw error;
    }

    const observable: Observable<any> = get(propertyName).pipe(operator(...args));

    set(observable);
  }
}
