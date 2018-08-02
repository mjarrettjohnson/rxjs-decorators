import { CreationOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class CreationOperatorHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: CreationOperatorPayload): void;
}
