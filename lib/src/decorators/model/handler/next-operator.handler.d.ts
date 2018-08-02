import { NextOperatorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class NextOperatorhandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: NextOperatorPayload): void;
}
