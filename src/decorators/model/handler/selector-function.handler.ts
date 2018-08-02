import { SelectorPayload } from '../../metadata';
import { NoStoreProvidedError } from '../errors';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { setterFactory } from './utils';

export class SelectorFunctionHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: SelectorPayload) {
    const { selector } = payload;

    if (!model.store) {
      throw new NoStoreProvidedError(model, propertyName);
    }

    const set = setterFactory(model, propertyName);

    set(model.store.select(selector));
  }
}
