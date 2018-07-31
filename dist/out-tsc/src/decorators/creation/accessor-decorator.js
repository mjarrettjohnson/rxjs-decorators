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
var utils_1 = require("../utils");
var method_decorator_1 = require("./method-decorator");
var IncorrectDecoratorType = /** @class */ (function (_super) {
    __extends(IncorrectDecoratorType, _super);
    function IncorrectDecoratorType(message, context, property, decorator) {
        var _this = this;
        var error = "\n    ----------------------------------------------\n    Class: " + context.constructor.name + "\n    Property: " + property + "\n    Decorator: " + decorator + "\n    Message: " + message + "\n    ----------------------------------------------\n    ";
        _this = _super.call(this, error) || this;
        return _this;
    }
    return IncorrectDecoratorType;
}(Error));
exports.IncorrectDecoratorType = IncorrectDecoratorType;
function createAccessorDecorator(metadata) {
    return function (target, key, descriptor) {
        var _a = metadata.payload, name = _a.name, operator = _a.operator, fn = _a.fn;
        if (!descriptor.get) {
            throw new IncorrectDecoratorType('Accessor decorator cannot be applied to a function', target, key, name);
        }
        var func = descriptor.get;
        descriptor.get = function () {
            var evaluated = func();
            if (!utils_1.isObservable(evaluated)) {
                throw new method_decorator_1.InvalidReturnType('Accessor must return an observable', target, key, name);
            }
            return evaluated.pipe(operator(fn));
        };
        return descriptor;
    };
}
exports.createAccessorDecorator = createAccessorDecorator;
//# sourceMappingURL=accessor-decorator.js.map