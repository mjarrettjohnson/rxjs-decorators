import { MapToOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class MapToOperatorHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: MapToOperatorPayload): void;
}
