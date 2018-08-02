"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../../metadata");
var errors_1 = require("../errors");
var SubscriptionDataRetriever = /** @class */ (function () {
    function SubscriptionDataRetriever(model) {
        var _this = this;
        this.model = model;
        this.handleSubscriptionMetadata = function (metadata) { return function (metadataKey) {
            var subscriptionMetadata = metadata[metadataKey];
            subscriptionMetadata.forEach(_this.linkSubscriptions(metadataKey));
        }; };
        this.linkSubscriptions = function (fnName) { return function (current) {
            var payload = current.payload;
            payload.forEach(function (propName) {
                var error = errors_1.checkType(_this.model, _this.model[propName], propName, 'Subscribe');
                if (error) {
                    throw error;
                }
                _this.model.subscriptions.push(_this.model[propName].subscribe(_this.model[fnName].bind(_this.model)));
            });
        }; };
    }
    SubscriptionDataRetriever.prototype.retrieve = function () {
        var metadata = Reflect.getMetadata(metadata_1.SUBSCRIPTION_METADATA, this.model);
        if (!metadata) {
            return;
        }
        Object.keys(metadata).forEach(this.handleSubscriptionMetadata(metadata));
    };
    return SubscriptionDataRetriever;
}());
exports.SubscriptionDataRetriever = SubscriptionDataRetriever;
//# sourceMappingURL=subscription.retriever.js.map