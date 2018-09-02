"use strict";
/**
 * @module operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipe = function (decorators) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return decorators.forEach(function (decorator) { return decorator.apply(void 0, args); });
}; };
//# sourceMappingURL=Pipe.js.map