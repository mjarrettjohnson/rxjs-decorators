"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function Filter(predicate, isBound) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: predicate,
        isBound: isBound,
        operator: operators_1.filter,
        name: 'Filter',
    });
    return creation_1.createDecorator(metadata);
}
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map