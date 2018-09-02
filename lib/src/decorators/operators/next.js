"use strict";
/**
 * @module operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function Next(subjectName) {
    var metadata = new metadata_1.NextOperatorMetadata({
        name: 'Next',
        subjectName: subjectName,
    });
    return creation_1.createDecorator(metadata);
}
exports.Next = Next;
//# sourceMappingURL=next.js.map