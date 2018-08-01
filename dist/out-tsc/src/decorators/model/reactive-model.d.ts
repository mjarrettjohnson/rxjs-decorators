import { Subscription } from 'rxjs';
export declare class ReactiveModel {
    subscriptions: Subscription[];
    private propertyHandler;
    private subscriptionHandler;
    constructor(store?: any);
    protected initialize(): void;
    protected destroy(): void;
    protected resubscribe(): void;
}
