"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var metadata_1 = require("../metadata");
exports.createSubscriptionDecorator = function (propertyName) { return function (target, key) {
    var metadata = Reflect.getMetadata(metadata_1.SUBSCRIPTION_METADATA, target) || {};
    var payload = new metadata_1.SubscriptionMetadata(propertyName);
    if (!utils_1.propertyExists(metadata, key)) {
        metadata[key] = [payload];
    }
    else {
        metadata[key] = metadata[key].concat([payload]);
    }
    Reflect.defineMetadata(metadata_1.SUBSCRIPTION_METADATA, metadata, target);
}; };
//# sourceMappingURL=subscription-decorator.js.map