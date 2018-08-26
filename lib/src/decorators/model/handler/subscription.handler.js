"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubscriptionHandler = /** @class */ (function () {
    function SubscriptionHandler() {
    }
    SubscriptionHandler.prototype.handle = function (model, propertyName, payload) {
        model.subscriptions.push(model[propertyName].subscribe());
    };
    return SubscriptionHandler;
}());
exports.SubscriptionHandler = SubscriptionHandler;
//# sourceMappingURL=subscription.handler.js.map