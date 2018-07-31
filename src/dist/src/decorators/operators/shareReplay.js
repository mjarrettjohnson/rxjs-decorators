"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creation_1 = require("../creation");
var operators_1 = require("rxjs/operators");
var metadata_1 = require("../metadata");
function ShareReplay(replayCount) {
    var metadata = new metadata_1.MonoOperatorMetadata({
        fn: function () { return replayCount; },
        isBound: false,
        operator: operators_1.shareReplay,
        name: 'shareReplay',
    });
    return creation_1.createDecorator(metadata);
}
exports.ShareReplay = ShareReplay;
//# sourceMappingURL=shareReplay.js.map