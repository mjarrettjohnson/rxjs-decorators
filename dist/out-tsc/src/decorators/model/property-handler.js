"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../metadata");
var errors_1 = require("./errors");
var utils_1 = require("../utils");
var reactive_model_1 = require("./reactive-model");
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
                    handleMonoOperator.call(_this.model, propertyName, current);
                    break;
                case metadata_1.CREATION_OPERATOR:
                    handleCreationOperator.call(_this.model, propertyName, current);
                    break;
                case metadata_1.MULTI_OPERATOR:
                    handleMultiOperator.call(_this.model, propertyName, current);
                    break;
                case metadata_1.MAP_TO_OPERATOR:
                    handleMapToOperator.call(_this.model, propertyName, current);
                    break;
                case metadata_1.MONO_OPERATOR_LIST:
                    handleMonoOperatorList.call(_this.model, propertyName, current);
                    break;
                case metadata_1.SELECTOR_FUNCTION:
                    handleSelectorFunction.call(_this.model, propertyName, current);
                    break;
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
function handleSelectorFunction(propertyName, current) {
    if (!this._store) {
        throw new errors_1.NoStoreProvidedError(this, propertyName);
    }
    this[propertyName] = this._store.select(current.payload.selector);
}
function handleMonoOperatorList(propertyName, current) {
    var _a = current.payload, operators = _a.operators, fns = _a.fns, name = _a.name;
    if (operators.length !== fns.length) {
        throw new errors_1.DifferentOperatorAndFunctionCountError(this, propertyName, name);
    }
    var observable = this[propertyName];
    var error = reactive_model_1.checkType(this.model, observable, propertyName, name);
    if (error) {
        throw error;
    }
    var combined = operators.map(function (op, index) {
        return op(fns[index]);
    });
    this[propertyName] = utils_1.pipeFromArray(combined)(observable);
}
function handleMapToOperator(propertyName, current) {
    var currentObs = this[propertyName];
    var currentFn = this[current.payload.functionName];
    var error = reactive_model_1.checkType(this.model, currentObs, propertyName, name);
    if (error) {
        throw error;
    }
    if (!currentFn) {
        throw new errors_1.FunctionDoesNotExistError(this, current.payload.functionName, current.payload.name);
    }
    this[propertyName] = currentObs.pipe(current.payload.operator(currentFn.bind(this)));
}
function handleMultiOperator(propertyName, current) {
    var _this = this;
    var _a;
    var args = current.payload.parameters.map(function (objectKey) {
        var observable = _this[objectKey];
        var error = reactive_model_1.checkType(_this.model, observable, propertyName, name);
        if (error) {
            throw error;
        }
        return observable;
    });
    var mainObs = this[propertyName];
    var error = reactive_model_1.checkType(this.model, mainObs, propertyName, name);
    if (error) {
        throw error;
    }
    this[propertyName] = this[propertyName].pipe((_a = current.payload).operator.apply(_a, args));
}
function handleCreationOperator(propertyName, current) {
    var _this = this;
    var _a;
    var toCombine = current.payload.parameters.map(function (objectKey) {
        var observable = _this[objectKey];
        var error = reactive_model_1.checkType(_this.model, observable, propertyName, name);
        if (error) {
            throw error;
        }
        return observable;
    });
    var currentObs = this[propertyName];
    if (currentObs && utils_1.isObservable(currentObs)) {
        toCombine.unshift(this[propertyName]);
    }
    this[propertyName] = (_a = current.payload).operator.apply(_a, toCombine);
}
function handleMonoOperator(propertyName, current) {
    var _a = current.payload, operator = _a.operator, name = _a.name, isBound = _a.isBound;
    var fn = current.payload.fn;
    var observable = this[propertyName];
    if (isBound) {
        fn = fn.bind(this);
    }
    var error = reactive_model_1.checkType(this.model, observable, propertyName, name);
    if (error) {
        throw error;
    }
    this[propertyName] = observable.pipe(operator(fn));
}
//# sourceMappingURL=property-handler.js.map