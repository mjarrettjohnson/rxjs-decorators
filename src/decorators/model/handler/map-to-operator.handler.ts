import { MapToOperatorPayload } from '../../metadata';
import { checkType, FunctionDoesNotExistError } from '../errors';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { getterFactory, setterFactory } from './utils';

export class MapToOperatorHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: MapToOperatorPayload) {
    const { functionName, operator, name } = payload;

    const get = getterFactory(model);
    const set = setterFactory(model, propertyName);

    const currentObs = get(propertyName);
    const currentFn = get(functionName);

    const error = checkType(model, currentObs, propertyName, name);

    if (error) {
      throw error;
    }

    if (!currentFn) {
      throw new FunctionDoesNotExistError(model, functionName, name);
    }

    const updatedObs = currentObs.pipe(operator(currentFn.bind(model)));

    set(updatedObs);
  }
}
