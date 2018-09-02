"use strict";
/**
 * @module model
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../metadata");
var errors_1 = require("./errors");
/**
 * A class that is responsible for retrieving all subscription metadata from a reactive model, subscribing
 * to the target observables and managing subscription destruction.
 */
var SubscriptionMetadataHandler = /** @class */ (function () {
    function SubscriptionMetadataHandler(model) {
        var _this = this;
        this.model = model;
        /**
         * Iterates over all metadata and links the subscriptions to the reactive model methods.
         */
        this.handleSubscriptionMetadata = function (metadata) { return function (metadataKey) {
            var subscriptionMetadata = metadata[metadataKey];
            subscriptionMetadata.forEach(_this.linkSubscriptions(metadataKey));
        }; };
        /**
         * Retrieves a method from the reactive model and applies it as the subscription
         * fuunction to the target observable property storing its subscription in
         * the model subscription array.
         */
        this.linkSubscriptions = function (fnName) { return function (current) {
            var payload = current.payload;
            var fn = _this.model[fnName];
            if (!fn) {
                fn = function () { };
            }
            payload.forEach(function (propName) {
                var error = errors_1.checkType(_this.model, _this.model[propName], propName, 'Subscribe');
                if (error) {
                    throw error;
                }
                _this.model.subscriptions.push(_this.model[propName].subscribe(fn.bind(_this.model)));
            });
        }; };
    }
    /**
     * Retrieves all Subscription metadata and applies the provided methods as subscription handlers
     */
    SubscriptionMetadataHandler.prototype.handle = function () {
        var metadata = Reflect.getMetadata(metadata_1.SUBSCRIPTION_METADATA, this.model);
        if (!metadata) {
            return;
        }
        Object.keys(metadata).forEach(this.handleSubscriptionMetadata(metadata));
    };
    return SubscriptionMetadataHandler;
}());
exports.SubscriptionMetadataHandler = SubscriptionMetadataHandler;
//# sourceMappingURL=subscription.handler.js.map