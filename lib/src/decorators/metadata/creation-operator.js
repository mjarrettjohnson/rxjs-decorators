"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module metadata
 */
var rxjs_1 = require("rxjs");
var model_1 = require("../model");
exports.CREATION_OPERATOR = 'Creation Operator';
/**
 * A metadata type that stores context data regarding rxjs creation
 * operators
 *
 */
var CreationOperatorMetadata = /** @class */ (function () {
    function CreationOperatorMetadata(payload) {
        this.payload = payload;
        this.type = exports.CREATION_OPERATOR;
    }
    return CreationOperatorMetadata;
}());
exports.CreationOperatorMetadata = CreationOperatorMetadata;
/**
 * Handles CreationOperator Metadata by applying the associated rxjs
 * creation operator to the provided observable(s)
 */
var CreationOperatorHandler = /** @class */ (function () {
    function CreationOperatorHandler() {
    }
    /**
     * Retrieves all observables properties and applies the rxjs creation operator
     * to them. The property the decorator applied to can be undefined or be
     * an observable itself. If it is an observable it will be included in the
     * operator.
     *
     * @param model the reactive model the decorator was applied to
     * @param propertyName the property the decorator was applied to
     * @param payload the decorator payload
     */
    CreationOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var operator = payload.operator, observableProperties = payload.observableProperties;
        var get = model_1.getObservableFactory(model);
        var set = model_1.setterFactory(model, propertyName);
        var toCombine = observableProperties.map(model_1.allParametersExist(model));
        var currentObs = get(propertyName);
        if (currentObs && rxjs_1.isObservable(currentObs)) {
            toCombine.unshift(currentObs);
        }
        set(operator.apply(void 0, toCombine));
    };
    return CreationOperatorHandler;
}());
exports.CreationOperatorHandler = CreationOperatorHandler;
//# sourceMappingURL=creation-operator.js.map