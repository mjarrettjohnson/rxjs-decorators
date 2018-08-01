"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var creation_1 = require("../creation");
function Next(subjectName) {
    var metadata = new metadata_1.NextOperatorMetadata({
        name: 'Next',
        subjectName: subjectName
    });
    return creation_1.createDecorator(metadata);
}
exports.Next = Next;
//# sourceMappingURL=next.js.map