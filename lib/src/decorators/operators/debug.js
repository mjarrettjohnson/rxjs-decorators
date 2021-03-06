"use strict";
/**
 * @module operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function Debug(tag) {
    if (tag === void 0) { tag = 'DEBUG::'; }
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: function (x) { return console.log(tag, x); },
        isBound: true,
        operator: operators_1.tap,
        name: 'Debug',
    });
    return creation_1.createDecorator(metadata);
}
exports.Debug = Debug;
//# sourceMappingURL=debug.js.map