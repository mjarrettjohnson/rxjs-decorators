import { SelectorPayload } from '../../metadata';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
export declare class SelectorFunctionHandler implements MetadataHandler {
    handle(model: ReactiveModel, propertyName: string, payload: SelectorPayload): void;
}
