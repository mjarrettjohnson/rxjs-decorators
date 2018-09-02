"use strict";
/**
 * @module utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines if a property exists on a supplied object
 * @param o the object that the property is meant to exist on
 * @param key the property name
 */
exports.propertyExists = function (o, key) { return !!o[key]; };
/**
 * Creates a Pipelin from an array of operators. Taken from rxjs/internals
 * @param fns a list of rxjs operators
 */
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