"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var errors_1 = require("../errors");
var utils_2 = require("./utils");
var MonoOperatorListHandler = /** @class */ (function () {
    function MonoOperatorListHandler() {
        this.isNotCorrectFunctionCount = function (operators, fns) { return operators.length !== fns.length; };
        this.applyOperatorsWith = function (fns) { return function (operator, index) { return operator(fns[index]); }; };
    }
    MonoOperatorListHandler.prototype.handle = function (model, propertyName, payload) {
        var operators = payload.operators, fns = payload.fns, name = payload.name;
        var get = utils_2.getterFactory(model);
        var set = utils_2.setterFactory(model, propertyName);
        if (this.isNotCorrectFunctionCount(operators, fns)) {
            throw new errors_1.DifferentOperatorAndFunctionCountError(model, propertyName, name);
        }
        var observable = get(propertyName);
        var error = errors_1.checkType(model, observable, propertyName, name);
        if (error) {
            throw error;
        }
        var pipeline = utils_1.pipeFromArray(operators.map(this.applyOperatorsWith(fns)));
        set(pipeline(observable));
    };
    return MonoOperatorListHandler;
}());
exports.MonoOperatorListHandler = MonoOperatorListHandler;
//# sourceMappingURL=mono-operator-list.handler.js.map