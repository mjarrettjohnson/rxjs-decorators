import { MultiOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class MultiOperatorHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: MultiOperatorPayload): void;
}
