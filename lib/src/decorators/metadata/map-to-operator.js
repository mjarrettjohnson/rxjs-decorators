"use strict";
/**
 * @module metadata
 */
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
exports.MAP_TO_OPERATOR = 'Map to operator';
/**
 *
 * A metadata type that applies a reactive model method
 * to a rxjs operator
 *
 * @see MapToOperatorHandler
 */
var MapToOperatorMetadata = /** @class */ (function () {
    function MapToOperatorMetadata(payload) {
        this.payload = payload;
        this.type = exports.MAP_TO_OPERATOR;
    }
    return MapToOperatorMetadata;
}());
exports.MapToOperatorMetadata = MapToOperatorMetadata;
/**
 * Handles MapToOperatorMetadata. Applies an existing method on a
 * Reactive Model to the provided operator
 */
var MapToOperatorHandler = /** @class */ (function () {
    function MapToOperatorHandler() {
    }
    /**
     * Retrieves the reactive model's method and applies it to the
     * provided rxjs operator
     *
     * @param model the reactive model that the decorator was applied to
     * @param propertyName the property that the decorator was applied to
     * @param payload the map to operator payload
     */
    MapToOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var methodName = payload.methodName, operator = payload.operator, name = payload.name;
        var get = model_1.getObservableFactory(model);
        var getFn = model_1.getFunctionFactory(model);
        var set = model_1.setterFactory(model, propertyName);
        var currentObs = get(propertyName);
        var currentFn = getFn(methodName);
        var error = model_1.checkType(model, currentObs, propertyName, name);
        if (error) {
            throw error;
        }
        if (!currentFn) {
            throw new model_1.FunctionDoesNotExistError(model, methodName, name);
        }
        var updatedObs = currentObs.pipe(operator(currentFn.bind(model)));
        set(updatedObs);
    };
    return MapToOperatorHandler;
}());
exports.MapToOperatorHandler = MapToOperatorHandler;
//# sourceMappingURL=map-to-operator.js.map