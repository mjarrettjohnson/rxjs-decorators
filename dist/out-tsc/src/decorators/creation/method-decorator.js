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
var rxjs_1 = require("rxjs");
var InvalidReturnType = /** @class */ (function (_super) {
    __extends(InvalidReturnType, _super);
    function InvalidReturnType(message, context, property, decorator) {
        var _this = this;
        var error = "\n    ----------------------------------------------\n    Class: " + context.constructor.name + "\n    Property: " + property + "\n    Decorator: " + decorator + "\n    Message: " + message + "\n    ----------------------------------------------\n    ";
        _this = _super.call(this, error) || this;
        return _this;
    }
    return InvalidReturnType;
}(Error));
exports.InvalidReturnType = InvalidReturnType;
function createMethodDecorator(metadata) {
    return function (target, key, descriptor) {
        var func = descriptor.value;
        var _a = metadata.payload, name = _a.name, operator = _a.operator, fn = _a.fn;
        descriptor.value = function () {
            var evaluated = func();
            if (!rxjs_1.isObservable(evaluated)) {
                throw new InvalidReturnType('Function must return an observable', target, key, name);
            }
            return evaluated.pipe(operator(fn));
        };
        return descriptor;
    };
}
exports.createMethodDecorator = createMethodDecorator;
//# sourceMappingURL=method-decorator.js.map