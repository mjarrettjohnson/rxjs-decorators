"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
exports.MULTI_OPERATOR = 'Multi Operator';
var MultiOperatorMetadata = /** @class */ (function () {
    function MultiOperatorMetadata(payload) {
        this.payload = payload;
        this.type = exports.MULTI_OPERATOR;
    }
    return MultiOperatorMetadata;
}());
exports.MultiOperatorMetadata = MultiOperatorMetadata;
/**
 * Handles MultiOperatorMetadata by applying the supplied operator args
 * to the rxjs operator and piping it onto the property observable
 */
var MultiOperatorHandler = /** @class */ (function () {
    function MultiOperatorHandler() {
    }
    /**
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the multi operator payload.
     */
    MultiOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var name = payload.name, operator = payload.operator, operatorArgs = payload.operatorArgs;
        var get = model_1.getObservableFactory(model);
        var set = model_1.setterFactory(model, propertyName);
        var args = operatorArgs.map(model_1.allParametersExist(model));
        var error = model_1.checkType(model, get(propertyName), propertyName, name);
        if (error) {
            throw error;
        }
        var observable = get(propertyName).pipe(operator.apply(void 0, args));
        set(observable);
    };
    return MultiOperatorHandler;
}());
exports.MultiOperatorHandler = MultiOperatorHandler;
//# sourceMappingURL=multi-operator.js.map