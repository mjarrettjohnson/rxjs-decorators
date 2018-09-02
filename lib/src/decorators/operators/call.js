"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module operators
 */
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function Call(methodName) {
    var metadata = new metadata_1.MapToOperatorMetadata({
        name: 'Call',
        methodName: methodName,
        operator: operators_1.tap,
    });
    return creation_1.createDecorator(metadata);
}
exports.Call = Call;
//# sourceMappingURL=call.js.map