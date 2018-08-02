import { isObservable, Observable } from 'rxjs';
import { CreationOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { allParametersExist, getterFactory, setterFactory } from './utils';

export class CreationOperatorHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: CreationOperatorPayload) {
    const { name, operator, parameters } = payload;

    const get = getterFactory(model);
    const set = setterFactory(model, propertyName);

    const toCombine: Array<Observable<any>> = parameters.map(allParametersExist(model));

    const currentObs = get(propertyName);

    if (currentObs && isObservable(currentObs)) {
      toCombine.unshift(currentObs);
    }

    set(operator(...toCombine));
  }
}
