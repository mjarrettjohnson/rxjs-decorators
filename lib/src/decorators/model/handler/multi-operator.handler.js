"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var utils_1 = require("./utils");
var MultiOperatorHandler = /** @class */ (function () {
    function MultiOperatorHandler() {
    }
    MultiOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var name = payload.name, operator = payload.operator, parameters = payload.parameters;
        var get = utils_1.getterFactory(model);
        var set = utils_1.setterFactory(model, propertyName);
        var args = parameters.map(utils_1.allParametersExist(model));
        var error = errors_1.checkType(model, get(propertyName), propertyName, name);
        if (error) {
            throw error;
        }
        var observable = get(propertyName).pipe(operator.apply(void 0, args));
        set(observable);
    };
    return MultiOperatorHandler;
}());
exports.MultiOperatorHandler = MultiOperatorHandler;
//# sourceMappingURL=multi-operator.handler.js.map