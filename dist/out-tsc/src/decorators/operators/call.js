"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var creation_1 = require("../creation");
var operators_1 = require("rxjs/operators");
function Call(functionName) {
    var metadata = new metadata_1.MapToOperatorMetadata({
        name: 'Call',
        functionName: functionName,
        operator: operators_1.tap
    });
    return creation_1.createDecorator(metadata);
}
exports.Call = Call;
//# sourceMappingURL=call.js.map