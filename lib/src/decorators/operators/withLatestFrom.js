"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module operators
 */
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function WithLatestFrom() {
    var propertyNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        propertyNames[_i] = arguments[_i];
    }
    var metadata = new metadata_1.MultiOperatorMetadata({
        name: 'withLatestFrom',
        operator: operators_1.withLatestFrom,
        operatorArgs: propertyNames,
    });
    return creation_1.createDecorator(metadata);
}
exports.WithLatestFrom = WithLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map