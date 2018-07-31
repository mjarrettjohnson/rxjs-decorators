"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var metadata_1 = require("../metadata");
var creation_1 = require("../creation");
function Exists() {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: function (x) { return !!x; },
        isBound: false,
        operator: operators_1.filter,
        name: 'filter',
    });
    return creation_1.createDecorator(metadata);
}
exports.Exists = Exists;
//# sourceMappingURL=exists.js.map