"use strict";
/**
 * @module operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function CombineLatest() {
    var propertyName = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        propertyName[_i] = arguments[_i];
    }
    var metadata = new metadata_1.CreationOperatorMetadata({
        name: 'combineLatest',
        operator: rxjs_1.combineLatest,
        observableProperties: propertyName,
    });
    return creation_1.createDecorator(metadata);
}
exports.CombineLatest = CombineLatest;
//# sourceMappingURL=combineLatest.js.map