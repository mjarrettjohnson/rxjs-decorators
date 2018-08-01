"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var creation_1 = require("../creation");
function Clone(subjectName) {
    var metadata = new metadata_1.NextOperatorMetadata({
        name: 'Clone',
        subjectName: subjectName
    });
    return creation_1.createDecorator(metadata);
}
exports.Clone = Clone;
//# sourceMappingURL=clone.js.map