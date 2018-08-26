import { SelectorPayload, SubscriptionMetadataPayload } from '../../metadata';
import { NoStoreProvidedError } from '../errors';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { setterFactory } from './utils';

export class SubscriptionHandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: SubscriptionMetadataPayload) {
    model.subscriptions.push(model[propertyName].subscribe());
  }
}
