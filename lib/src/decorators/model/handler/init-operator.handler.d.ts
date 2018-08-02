import { InitOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class InitOperatorHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: any, payload: InitOperatorPayload): void;
}
