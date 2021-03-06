"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module model
 */
var rxjs_1 = require("rxjs");
/**
 * Thrown when a decorator is applied to an undefined property.
 */
var PropertyDoesNotExistError = /** @class */ (function (_super) {
    __extends(PropertyDoesNotExistError, _super);
    function PropertyDoesNotExistError(context, property, decorator) {
        var _this = _super.call(this) || this;
        _this.message = "PropertyDoesNotExistError\n     ------------------------------\n     Class: " + context.constructor.name + "\n     Property: " + property + "\n     Decorator: " + decorator + "\n     Message: Property is undefined\n     ------------------------------";
        return _this;
    }
    return PropertyDoesNotExistError;
}(Error));
exports.PropertyDoesNotExistError = PropertyDoesNotExistError;
/**
 * Thrown when a decorator is applied to a non observable property.
 */
var PropertyIsNotObservableError = /** @class */ (function (_super) {
    __extends(PropertyIsNotObservableError, _super);
    function PropertyIsNotObservableError(context, property, decorator) {
        var _this = _super.call(this) || this;
        _this.message = "PropertyIsNotObservableError\n     ------------------------------\n     Class: " + context.constructor.name + "\n     Property: " + property + "\n     Decorator: " + decorator + "\n     Message: Property is not an observable\n     ------------------------------\n    ";
        return _this;
    }
    return PropertyIsNotObservableError;
}(Error));
exports.PropertyIsNotObservableError = PropertyIsNotObservableError;
/**
 * Thrown when a function does not exist on a reactive model at the property provided.
 */
var FunctionDoesNotExistError = /** @class */ (function (_super) {
    __extends(FunctionDoesNotExistError, _super);
    function FunctionDoesNotExistError(context, property, decorator) {
        var _this = _super.call(this) || this;
        _this.message = "FunctionDoesNotExistError\n     ------------------------------\n     Class: " + context.constructor.name + "\n     Function: " + property + "\n     Decorator: " + decorator + "\n     Message: Function does not exist\n     ------------------------------\n    ";
        return _this;
    }
    return FunctionDoesNotExistError;
}(Error));
exports.FunctionDoesNotExistError = FunctionDoesNotExistError;
/**
 * Thrown when a different number of operators and operator functions has
 * been supplied
 */
var DifferentOperatorAndFunctionCountError = /** @class */ (function (_super) {
    __extends(DifferentOperatorAndFunctionCountError, _super);
    function DifferentOperatorAndFunctionCountError(context, property, decorator) {
        var _this = _super.call(this) || this;
        _this.message = "DifferentOperatorAndFunctionCountError\n     ------------------------------\n     Class: " + context.constructor.name + "\n     Function: " + property + "\n     Decorator: " + decorator + "\n     Message: You have supplied a different number of operator and callable functions\n     ------------------------------\n    ";
        return _this;
    }
    return DifferentOperatorAndFunctionCountError;
}(Error));
exports.DifferentOperatorAndFunctionCountError = DifferentOperatorAndFunctionCountError;
/**
 * Thrown when the selector decorator is used by no NgRx Store
 * has been injected.
 */
var NoStoreProvidedError = /** @class */ (function (_super) {
    __extends(NoStoreProvidedError, _super);
    function NoStoreProvidedError(context, property) {
        var _this = _super.call(this) || this;
        _this.message = "NoStoreProvidedError\n     ------------------------------\n     Class: " + context.constructor.name + "\n     Function: " + property + "\n     Message: You have tried to call a selector function without providing the store\n     ------------------------------\n    ";
        return _this;
    }
    return NoStoreProvidedError;
}(Error));
exports.NoStoreProvidedError = NoStoreProvidedError;
/**
 * Throws an error if the retrieved property does not exist or is
 * not an observable.
 *
 * @param model the reactive model to check
 * @param observable the observable that was retrieved from the model
 * @param propertyName the property that was used to retrieve the observable
 * @param decorator the decorator that was used.
 */
function checkType(model, observable, propertyName, decorator) {
    if (!observable) {
        return new PropertyDoesNotExistError(model, propertyName, decorator);
    }
    if (!rxjs_1.isObservable(observable)) {
        return new PropertyIsNotObservableError(model, propertyName, decorator);
    }
    return null;
}
exports.checkType = checkType;
//# sourceMappingURL=errors.js.map