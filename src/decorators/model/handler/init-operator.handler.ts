import { isObservable } from 'rxjs';
import { InitOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { setterFactory } from './utils';

export class InitOperatorHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName, payload: InitOperatorPayload) {
    const { name, observable } = payload;

    if (!observable || !isObservable(observable)) {
      throw new Error('Observable was undefined');
    }

    const set = setterFactory(model, propertyName);

    set(observable);
  }
}
