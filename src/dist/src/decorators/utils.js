"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
exports.isObservable = function (x) { return x instanceof rxjs_1.Observable; };
exports.propertyExists = function (o, key) { return !!o[key]; };
function pipeFromArray(fns) {
    if (!fns) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
function noop() { }
exports.noop = noop;
//# sourceMappingURL=utils.js.map