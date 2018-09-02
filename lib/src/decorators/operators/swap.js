"use strict";
/**
 * @module operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function Swap(switchFn) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: switchFn,
        isBound: true,
        operator: operators_1.switchMap,
        name: 'Swap',
    });
    return creation_1.createDecorator(metadata);
}
exports.Swap = Swap;
function SwapTo(methodName) {
    var metadata = new metadata_1.MapToOperatorMetadata({
        methodName: methodName,
        name: 'SwitchTo',
        operator: operators_1.switchMap,
    });
    return creation_1.createDecorator(metadata);
}
exports.SwapTo = SwapTo;
//# sourceMappingURL=swap.js.map