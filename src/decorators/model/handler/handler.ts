import { MetadataPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';

export interface MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: MetadataPayload): void;
}
