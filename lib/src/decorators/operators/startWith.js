"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function StartWith(startingValue) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: startingValue,
        isBound: false,
        operator: operators_1.startWith,
        name: 'startWith',
    });
    return creation_1.createDecorator(metadata);
}
exports.StartWith = StartWith;
//# sourceMappingURL=startWith.js.map