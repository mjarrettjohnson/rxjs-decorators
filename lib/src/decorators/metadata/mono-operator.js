"use strict";
/**
 * @module metadata
 */
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
exports.MONO_OPERATOR = 'Mono Operator';
var MonoOperatorMetadata = /** @class */ (function () {
    function MonoOperatorMetadata(payload) {
        this.payload = payload;
        this.type = exports.MONO_OPERATOR;
    }
    return MonoOperatorMetadata;
}());
exports.MonoOperatorMetadata = MonoOperatorMetadata;
/**
 * Handles MonoOperatorMetadata by piping the supplied operator and
 * arguments to the observable that the decorator is applied to.
 */
var MonoOperatorHandler = /** @class */ (function () {
    function MonoOperatorHandler() {
    }
    /**
     * Pipes the operator with its supplied arguments onto the observable
     * that is returned by accessing the model at the supplied property name.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the operator and arguments
     */
    MonoOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var operator = payload.operator, name = payload.name, isBound = payload.isBound;
        var fn = payload.fn;
        var get = model_1.getObservableFactory(model);
        var set = model_1.setterFactory(model, propertyName);
        var observable = get(propertyName);
        if (isBound && typeof fn === 'function') {
            fn = fn.bind(this);
        }
        var error = model_1.checkType(model, observable, propertyName, name);
        if (error) {
            throw error;
        }
        set(observable.pipe(operator(fn)));
    };
    return MonoOperatorHandler;
}());
exports.MonoOperatorHandler = MonoOperatorHandler;
//# sourceMappingURL=mono-operator.js.map