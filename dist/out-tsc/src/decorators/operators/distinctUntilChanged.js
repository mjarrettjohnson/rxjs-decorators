"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
function DistinctUntilChanged(comparator) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: comparator,
        isBound: true,
        operator: operators_1.distinctUntilChanged,
        name: 'distinctUntilChanged',
    });
    return creation_1.createDecorator(metadata);
}
exports.DistinctUntilChanged = DistinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map