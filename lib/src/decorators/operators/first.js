"use strict";
/**
 * @module operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function First(isBound) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: rxjs_1.noop,
        isBound: isBound,
        operator: operators_1.first,
        name: 'first',
    });
    return creation_1.createDecorator(metadata);
}
exports.First = First;
//# sourceMappingURL=first.js.map