"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
function Transform(transform, isBound) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: transform,
        isBound: isBound,
        operator: operators_1.map,
        name: 'map',
    });
    return creation_1.createDecorator(metadata);
}
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map