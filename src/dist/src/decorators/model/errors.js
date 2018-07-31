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
//# sourceMappingURL=errors.js.map