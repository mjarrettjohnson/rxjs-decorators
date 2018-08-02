import { MonoOperatorListPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class MonoOperatorListHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorListPayload): void;
    private isNotCorrectFunctionCount;
    private applyOperatorsWith;
}
