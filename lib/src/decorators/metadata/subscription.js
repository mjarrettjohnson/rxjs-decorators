"use strict";
/**
 * @module metadata
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBSCRIPTION_FUNCTION = 'Subscription Function';
var SubscriptionMetadata = /** @class */ (function () {
    function SubscriptionMetadata(payload) {
        this.payload = payload;
        this.type = exports.SUBSCRIPTION_FUNCTION;
    }
    return SubscriptionMetadata;
}());
exports.SubscriptionMetadata = SubscriptionMetadata;
/**
 * Handles the SubsriptionMetadata by subscripting to the observable the
 * decorator is applied to with no provided subscribe function.
 *
 * @see SubscriptionRetriever
 */
var SubscriptionHandler = /** @class */ (function () {
    function SubscriptionHandler() {
    }
    /**
     * Subscribes to the observable located at the property name
     * and adds the subscription to a list to be disposed at model destruction.
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload unused
     */
    SubscriptionHandler.prototype.handle = function (model, propertyName, payload) {
        model.subscriptions.push(model[propertyName].subscribe());
    };
    return SubscriptionHandler;
}());
exports.SubscriptionHandler = SubscriptionHandler;
//# sourceMappingURL=subscription.js.map