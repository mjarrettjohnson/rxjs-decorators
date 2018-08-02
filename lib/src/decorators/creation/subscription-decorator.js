"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var utils_1 = require("../utils");
exports.createSubscriptionDecorator = function (propertyNames) { return function (target, key) {
    var metadata = Reflect.getMetadata(metadata_1.SUBSCRIPTION_METADATA, target) || {};
    var payload = new metadata_1.SubscriptionMetadata(propertyNames);
    if (!utils_1.propertyExists(metadata, key)) {
        metadata[key] = [payload];
    }
    else {
        metadata[key] = metadata[key].concat([payload]);
    }
    Reflect.defineMetadata(metadata_1.SUBSCRIPTION_METADATA, metadata, target);
}; };
//# sourceMappingURL=subscription-decorator.js.map