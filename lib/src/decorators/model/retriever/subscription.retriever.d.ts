import 'reflect-metadata';
import { ReactiveModel } from '../reactive-model';
export declare class SubscriptionDataRetriever {
    private model;
    constructor(model: ReactiveModel);
    retrieve(): void;
    private handleSubscriptionMetadata;
    private linkSubscriptions;
}
