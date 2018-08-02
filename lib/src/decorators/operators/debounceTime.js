"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function DebounceTime(time, isBound) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: time,
        isBound: isBound,
        operator: operators_1.debounceTime,
        name: 'debounceTime',
    });
    return creation_1.createDecorator(metadata);
}
exports.DebounceTime = DebounceTime;
//# sourceMappingURL=debounceTime.js.map