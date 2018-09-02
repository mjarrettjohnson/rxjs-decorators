"use strict";
/**
 * @module creation
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../metadata");
var utils_1 = require("../utils");
/**
 * Stores the necessary context information in the classes metadata via the property
 * the decorator is attached to. At runtime this context information is retrieved and
 * used by a custom built handler.
 *
 * @see createDecorator
 *
 * @param payload context information that is used by the associated metadata handler
 */
exports.createPropertyDecorator = function (payload) { return function (target, key) {
    var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, target) || {};
    if (!utils_1.propertyExists(metadata, key)) {
        metadata[key] = [payload];
    }
    else {
        metadata[key] = metadata[key].concat([payload]);
    }
    Reflect.defineMetadata(metadata_1.PROP_METADATA, metadata, target);
}; };
//# sourceMappingURL=property-decorator.js.map