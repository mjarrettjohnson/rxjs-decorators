import { PropertyDoesNotExistError, PropertyIsNotObservableError } from './errors';
export declare class ReactiveModel {
    private propertyHandler;
    private subscriptionHandler;
    constructor(store?: any);
    protected initialize(): void;
}
export declare function checkType(model: ReactiveModel, observable: any, propertyName: string, decorator: string): PropertyDoesNotExistError | PropertyIsNotObservableError;
//# sourceMappingURL=reactive-model.d.ts.map