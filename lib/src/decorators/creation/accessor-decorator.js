"use strict";
/**
 * @module creation
 */
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
var rxjs_1 = require("rxjs");
var method_decorator_1 = require("./method-decorator");
/**
 * An error that is applied when an accessor decorator is applied to a function.
 *
 */
var IncorrectDecoratorType = /** @class */ (function (_super) {
    __extends(IncorrectDecoratorType, _super);
    /**
     *
     * @param message the error message to dispaly
     * @param context the class that the decorator was applied to
     * @param property the property that the decorator was applied to
     * @param decorator the name of the decorator.
     */
    function IncorrectDecoratorType(message, context, property, decorator) {
        var _this = this;
        var error = "\n    ----------------------------------------------\n    Class: " + context.constructor.name + "\n    Property: " + property + "\n    Decorator: " + decorator + "\n    Message: " + message + "\n    ----------------------------------------------\n    ";
        _this = _super.call(this, error) || this;
        return _this;
    }
    return IncorrectDecoratorType;
}(Error));
exports.IncorrectDecoratorType = IncorrectDecoratorType;
/**
 * Applies an rxjs operator to a getter that returns an observable
 *
 * @param metadata a decorator payload that is the context for the decorator
 */
function createAccessorDecorator(metadata) {
    return attachOperator.bind(metadata);
}
exports.createAccessorDecorator = createAccessorDecorator;
/**
 *
 * Applies a rxjs operator to an observable returned by the getter the
 * decorator is attached to.
 *
 * @param target A reactive model
 * @param key the property on the model
 * @param descriptor the describing object that has a getter attached
 */
function attachOperator(target, key, descriptor) {
    var metadata = this;
    var _a = metadata.payload, name = _a.name, operator = _a.operator, fn = _a.fn;
    if (!descriptor.get) {
        throw new IncorrectDecoratorType('Accessor decorator cannot be applied to a function', target, key, name);
    }
    var func = descriptor.get;
    descriptor.get = function () {
        var evaluated = func();
        if (!rxjs_1.isObservable(evaluated)) {
            throw new method_decorator_1.InvalidReturnType('Accessor must return an observable', target, key, name);
        }
        return evaluated.pipe(operator(fn));
    };
    return descriptor;
}
//# sourceMappingURL=accessor-decorator.js.map