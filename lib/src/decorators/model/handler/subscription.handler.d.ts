import { SubscriptionMetadataPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class SubscriptionHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: SubscriptionMetadataPayload): void;
}
