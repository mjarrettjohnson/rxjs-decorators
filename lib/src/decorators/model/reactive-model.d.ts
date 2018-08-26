import { Subscription } from 'rxjs';
export declare class ReactiveModel {
    store?: any;
    subscriptions: Subscription[];
    private propertyRetriever;
    private subscriptionRetriever;
    constructor(store?: any);
    protected initialize(): void;
    protected destroy(): void;
    protected resubscribe(): void;
}
export declare class ReactiveComponent<T> extends ReactiveModel {
    private formModel;
    constructor(formModel: T);
}
