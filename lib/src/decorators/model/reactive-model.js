"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var retriever_1 = require("./retriever");
var ReactiveModel = /** @class */ (function () {
    function ReactiveModel(store) {
        this.store = store;
        this.subscriptions = [];
        this.propertyRetriever = new retriever_1.PropertyDataRetriever(this, store);
        this.subscriptionRetriever = new retriever_1.SubscriptionDataRetriever(this);
    }
    ReactiveModel.prototype.initialize = function () {
        this.propertyRetriever.retrieve();
        this.subscriptionRetriever.retrieve();
    };
    ReactiveModel.prototype.destroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ReactiveModel.prototype.resubscribe = function () {
        this.subscriptionRetriever.retrieve();
    };
    return ReactiveModel;
}());
exports.ReactiveModel = ReactiveModel;
//# sourceMappingURL=reactive-model.js.map