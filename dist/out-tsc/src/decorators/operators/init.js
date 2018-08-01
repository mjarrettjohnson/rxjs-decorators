"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var rxjs_1 = require("rxjs");
var creation_1 = require("../creation");
function Behaviour(initial) {
    var metadata = new metadata_1.InitOperatorMetadata({
        name: 'BehaviourSubject',
        observable: new rxjs_1.BehaviorSubject(initial || null)
    });
    return creation_1.createDecorator(metadata);
}
exports.Behaviour = Behaviour;
function From(initial) {
    var metadata = new metadata_1.InitOperatorMetadata({
        name: 'BehaviourSubject',
        observable: rxjs_1.of(initial)
    });
    return creation_1.createDecorator(metadata);
}
exports.From = From;
//# sourceMappingURL=init.js.map