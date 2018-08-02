"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var utils_1 = require("./utils");
var CreationOperatorHandler = /** @class */ (function () {
    function CreationOperatorHandler() {
    }
    CreationOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var name = payload.name, operator = payload.operator, parameters = payload.parameters;
        var get = utils_1.getterFactory(model);
        var set = utils_1.setterFactory(model, propertyName);
        var toCombine = parameters.map(utils_1.allParametersExist(model));
        var currentObs = get(propertyName);
        if (currentObs && rxjs_1.isObservable(currentObs)) {
            toCombine.unshift(currentObs);
        }
        set(operator.apply(void 0, toCombine));
    };
    return CreationOperatorHandler;
}());
exports.CreationOperatorHandler = CreationOperatorHandler;
//# sourceMappingURL=creation-operator.handler.js.map