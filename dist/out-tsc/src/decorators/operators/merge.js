"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var rxjs_1 = require("rxjs");
var creation_1 = require("../creation");
function Merge() {
    var propertyName = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        propertyName[_i] = arguments[_i];
    }
    var metadata = new metadata_1.CreationOperatorMetadata({
        name: 'merge',
        operator: rxjs_1.merge,
        parameters: propertyName,
    });
    return creation_1.createDecorator(metadata);
}
exports.Merge = Merge;
//# sourceMappingURL=merge.js.map