/**
 * @module metadata
 */
import { ReactiveModel } from '../model';
import { MetadataPayload } from './index';
/**
 * A handler attached to a ReactiveModel that uses the applied metadata
 * to alter an observable pipeline.
 */
export interface MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: MetadataPayload): void;
}
