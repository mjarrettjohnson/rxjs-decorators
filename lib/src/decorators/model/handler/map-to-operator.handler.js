"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var utils_1 = require("./utils");
var MapToOperatorHandler = /** @class */ (function () {
    function MapToOperatorHandler() {
    }
    MapToOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var functionName = payload.functionName, operator = payload.operator, name = payload.name;
        var get = utils_1.getterFactory(model);
        var set = utils_1.setterFactory(model, propertyName);
        var currentObs = get(propertyName);
        var currentFn = get(functionName);
        var error = errors_1.checkType(model, currentObs, propertyName, name);
        if (error) {
            throw error;
        }
        if (!currentFn) {
            throw new errors_1.FunctionDoesNotExistError(model, functionName, name);
        }
        var updatedObs = currentObs.pipe(operator(currentFn.bind(model)));
        set(updatedObs);
    };
    return MapToOperatorHandler;
}());
exports.MapToOperatorHandler = MapToOperatorHandler;
//# sourceMappingURL=map-to-operator.handler.js.map