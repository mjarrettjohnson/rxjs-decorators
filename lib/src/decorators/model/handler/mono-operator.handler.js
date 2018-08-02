"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var utils_1 = require("./utils");
var MonoOperatorHandler = /** @class */ (function () {
    function MonoOperatorHandler() {
    }
    MonoOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var operator = payload.operator, name = payload.name, isBound = payload.isBound;
        var fn = payload.fn;
        var get = utils_1.getterFactory(model);
        var set = utils_1.setterFactory(model, propertyName);
        var observable = get(propertyName);
        if (isBound && typeof fn === 'function') {
            fn = fn.bind(this);
        }
        var error = errors_1.checkType(model, observable, propertyName, name);
        if (error) {
            throw error;
        }
        set(observable.pipe(operator(fn)));
    };
    return MonoOperatorHandler;
}());
exports.MonoOperatorHandler = MonoOperatorHandler;
//# sourceMappingURL=mono-operator.handler.js.map