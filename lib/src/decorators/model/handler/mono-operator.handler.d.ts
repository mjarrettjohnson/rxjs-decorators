import { MonoOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class MonoOperatorHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorPayload): void;
}
