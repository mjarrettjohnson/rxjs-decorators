"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
function WithThis(sideEffect) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: sideEffect,
        isBound: true,
        operator: operators_1.tap,
        name: 'tap',
    });
    return creation_1.createDecorator(metadata);
}
exports.WithThis = WithThis;
//# sourceMappingURL=WithThis.js.map