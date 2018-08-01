"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property_handler_1 = require("./property-handler");
var subscription_handler_1 = require("./subscription-handler");
var ReactiveModel = /** @class */ (function () {
    function ReactiveModel(store) {
        this.subscriptions = [];
        this.propertyHandler = new property_handler_1.PropertyDataHandler(this, store);
        this.subscriptionHandler = new subscription_handler_1.SubscriptionDataHandler(this);
    }
    ReactiveModel.prototype.initialize = function () {
        this.propertyHandler.apply();
        this.subscriptionHandler.apply();
    };
    ReactiveModel.prototype.destroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ReactiveModel.prototype.resubscribe = function () {
        this.subscriptionHandler.apply();
    };
    return ReactiveModel;
}());
exports.ReactiveModel = ReactiveModel;
//# sourceMappingURL=reactive-model.js.map