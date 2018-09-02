"use strict";
/**
 * @module creation
 */
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var utils_1 = require("../utils");
/**
 *
 * Applies a series of property names within a classes metadata based on the applied methods
 * property key. At runtime this function is used as a subscription to all properties previously mentioned.
 *
 * @example
 *
 * export class DecoratorDemo extends ReactiveModel {
 *
 *   seconds$ = interval(1000); *
 *
 *   constructor() {
 *     super();
 *     This.initialize();
 *   }
 *
 *   Subscribe('seconds$')
 *   logSecond(second: number) {
 *     console.log(second);
 *   }
 * }
 *
 * @param propertyNames a list of observable properties on a reactive model.
 *
 * @see ReactiveModel
 */
exports.createSubscriptionDecorator = function () {
    var propertyNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        propertyNames[_i] = arguments[_i];
    }
    return function (target, key) {
        var metadata = Reflect.getMetadata(metadata_1.SUBSCRIPTION_METADATA, target) || {};
        var payload = new metadata_1.SubscriptionMetadata(propertyNames);
        if (!utils_1.propertyExists(metadata, key)) {
            metadata[key] = [payload];
        }
        else {
            metadata[key] = metadata[key].concat([payload]);
        }
        Reflect.defineMetadata(metadata_1.SUBSCRIPTION_METADATA, metadata, target);
    };
};
//# sourceMappingURL=subscription-decorator.js.map