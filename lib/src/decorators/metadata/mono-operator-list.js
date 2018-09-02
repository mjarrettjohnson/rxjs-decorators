"use strict";
/**
 * @module metadata
 */
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var utils_1 = require("../utils");
exports.MONO_OPERATOR_LIST = 'Mono Operator List';
/**
 * A metadata type that stores an observable onto a property
 * of a reactive model.
 */
var MonoOperatorListMetadata = /** @class */ (function () {
    function MonoOperatorListMetadata(payload) {
        this.payload = payload;
        this.type = exports.MONO_OPERATOR_LIST;
    }
    return MonoOperatorListMetadata;
}());
exports.MonoOperatorListMetadata = MonoOperatorListMetadata;
/**
 * Handles MonoOperatorListMetadata by applying the supplied functions to
 * the supplied operators to build a pipeline.
 */
var MonoOperatorListHandler = /** @class */ (function () {
    function MonoOperatorListHandler() {
        /**
         * Returns true if an equal number of operators and functions has been provided
         * @param operators a list of rxjs operators
         * @param fns a list of functions
         */
        this.isNotCorrectFunctionCount = function (operators, fns) {
            return operators.length !== fns.length;
        };
        /**
         * Returns a function that maps overa list of operators an applies the index equivalent function to
         * the current operator
         * @param fns a list functions
         */
        this.applyOperatorsWith = function (fns) { return function (operator, index) { return operator(fns[index]); }; };
    }
    /**
     * For each operator applies the index equivalent function to the operator.
     * Builds an observable pipeline by applying all operators before finally attaching
     * it to the reactive model observable.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to.
     * @param payload the list of functions and operators
     */
    MonoOperatorListHandler.prototype.handle = function (model, propertyName, payload) {
        var operators = payload.operators, fns = payload.fns, name = payload.name;
        var get = model_1.getObservableFactory(model);
        var set = model_1.setterFactory(model, propertyName);
        if (this.isNotCorrectFunctionCount(operators, fns)) {
            throw new model_1.DifferentOperatorAndFunctionCountError(model, propertyName, name);
        }
        var observable = get(propertyName);
        var error = model_1.checkType(model, observable, propertyName, name);
        if (error) {
            throw error;
        }
        var pipeline = utils_1.pipeFromArray(operators.map(this.applyOperatorsWith(fns)));
        set(pipeline(observable));
    };
    return MonoOperatorListHandler;
}());
exports.MonoOperatorListHandler = MonoOperatorListHandler;
//# sourceMappingURL=mono-operator-list.js.map