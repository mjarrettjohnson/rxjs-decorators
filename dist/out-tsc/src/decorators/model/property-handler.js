"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../metadata");
var errors_1 = require("./errors");
var rxjs_1 = require("rxjs");
var utils_1 = require("../utils");
var operators_1 = require("rxjs/operators");
var PropertyDataHandler = /** @class */ (function () {
    function PropertyDataHandler(model, store) {
        var _this = this;
        this.model = model;
        this.store = store;
        this.handlePropertyMetadata = function (metadata) { return function (metadataKey) {
            var propertyMetadata = metadata[metadataKey];
            propertyMetadata.forEach(_this.selectPropertyDecoratorHandler(metadataKey));
        }; };
        this.selectPropertyDecoratorHandler = function (propertyName) { return function (current) {
            switch (current.type) {
                case metadata_1.MONO_OPERATOR:
                    handleMonoOperator.bind(_this.model)(propertyName, current.payload);
                    break;
                case metadata_1.CREATION_OPERATOR:
                    handleCreationOperator.bind(_this.model)(propertyName, current.payload);
                    break;
                case metadata_1.MULTI_OPERATOR:
                    handleMultiOperator.bind(_this.model)(propertyName, current.payload);
                    break;
                case metadata_1.MAP_TO_OPERATOR:
                    handleMapToOperator.bind(_this.model)(propertyName, current.payload);
                    break;
                case metadata_1.MONO_OPERATOR_LIST:
                    handleMonoOperatorList.bind(_this.model)(propertyName, current.payload);
                    break;
                case metadata_1.SELECTOR_FUNCTION:
                    handleSelectorFunction.bind(_this.model)(propertyName, current.payload);
                    break;
                case metadata_1.NEXT_OPERATOR:
                    handleNextFunction.bind(_this.model)(propertyName, current.payload);
                    break;
                case metadata_1.INIT_OPERATOR:
                    handleInitOperator.bind(_this.model)(propertyName, current.payload);
            }
        }; };
    }
    ;
    PropertyDataHandler.prototype.apply = function () {
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, this.model);
        if (!metadata) {
            return;
        }
        Object.keys(metadata).forEach(this.handlePropertyMetadata(metadata));
    };
    return PropertyDataHandler;
}());
exports.PropertyDataHandler = PropertyDataHandler;
var getterFactory = function (context) { return function (name) {
    return context[name];
}; };
var setterFactory = function (context, name) { return function (value) {
    context[name] = value;
}; };
function handleInitOperator(propertyName, payload) {
    var name = payload.name, observable = payload.observable;
    if (!observable || !rxjs_1.isObservable(observable)) {
        throw new Error('Observable was undefined');
    }
    var set = setterFactory(this, propertyName);
    set(observable);
}
function handleNextFunction(propertyName, payload) {
    var subjectName = payload.subjectName, name = payload.name;
    var get = getterFactory(this);
    var set = setterFactory(this, propertyName);
    var subject = get(subjectName);
    var error = errors_1.checkType(this, subject, subjectName, name);
    if (error) {
        throw error;
    }
    var obs = get(propertyName).pipe(operators_1.tap(function (x) { return subject.next(x); }));
    set(obs);
}
function handleSelectorFunction(propertyName, payload) {
    var selector = payload.selector;
    if (!this._store) {
        throw new errors_1.NoStoreProvidedError(this, propertyName);
    }
    var set = setterFactory(this, propertyName);
    set(this._store.select(selector));
}
var isNotCorrectFunctionCount = function (operators, fns) { return operators.length !== fns.length; };
var applyOperatorsWith = function (fns) { return function (operator, index) { return operator(fns[index]); }; };
function handleMonoOperatorList(propertyName, payload) {
    var operators = payload.operators, fns = payload.fns, name = payload.name;
    var get = getterFactory(this);
    var set = setterFactory(this, propertyName);
    if (isNotCorrectFunctionCount(operators, fns)) {
        throw new errors_1.DifferentOperatorAndFunctionCountError(this, propertyName, name);
    }
    var observable = get(propertyName);
    var error = errors_1.checkType(this, observable, propertyName, name);
    if (error) {
        throw error;
    }
    var pipeline = utils_1.pipeFromArray(operators.map(applyOperatorsWith(fns)));
    set(pipeline(observable));
}
function handleMapToOperator(propertyName, payload) {
    var functionName = payload.functionName, operator = payload.operator, name = payload.name;
    var get = getterFactory(this);
    var set = setterFactory(this, propertyName);
    var currentObs = get(propertyName);
    var currentFn = get(functionName);
    var error = errors_1.checkType(this, currentObs, propertyName, name);
    if (error) {
        throw error;
    }
    if (!currentFn) {
        throw new errors_1.FunctionDoesNotExistError(this, functionName, name);
    }
    var updatedObs = currentObs.pipe(operator(currentFn.bind(this)));
    set(updatedObs);
}
var allParametersExist = function (that) { return function (property) {
    var get = getterFactory(that);
    var observable = get(property);
    var error = errors_1.checkType(_this, observable, property, name);
    if (error) {
        throw error;
    }
    return observable;
}; };
function handleMultiOperator(propertyName, payload) {
    var name = payload.name, operator = payload.operator, parameters = payload.parameters;
    var get = getterFactory(this);
    var set = setterFactory(this, propertyName);
    var args = parameters.map(allParametersExist(this));
    var error = errors_1.checkType(this, get(propertyName), propertyName, name);
    if (error) {
        throw error;
    }
    var observable = get(propertyName).pipe(operator.apply(void 0, args));
    set(observable);
}
function handleCreationOperator(propertyName, payload) {
    var name = payload.name, operator = payload.operator, parameters = payload.parameters;
    var get = getterFactory(this);
    var set = setterFactory(this, propertyName);
    var toCombine = parameters.map(allParametersExist(this));
    var currentObs = get(propertyName);
    if (currentObs && rxjs_1.isObservable(currentObs)) {
        toCombine.unshift(currentObs);
    }
    set(operator.apply(void 0, toCombine));
}
function handleMonoOperator(propertyName, payload) {
    var operator = payload.operator, name = payload.name, isBound = payload.isBound;
    var fn = payload.fn;
    var get = getterFactory(this);
    var set = setterFactory(this, propertyName);
    var observable = get(propertyName);
    if (isBound && typeof fn === 'function') {
        fn = fn.bind(this);
    }
    var error = errors_1.checkType(this, observable, propertyName, name);
    if (error) {
        throw error;
    }
    set(observable.pipe(operator(fn)));
}
//# sourceMappingURL=property-handler.js.map