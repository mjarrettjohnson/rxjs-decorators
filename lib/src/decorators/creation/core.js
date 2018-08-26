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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var accessor_decorator_1 = require("./accessor-decorator");
var method_decorator_1 = require("./method-decorator");
var property_decorator_1 = require("./property-decorator");
var subscription_decorator_1 = require("./subscription-decorator");
var InvalidMetadataForDecoratorError = /** @class */ (function (_super) {
    __extends(InvalidMetadataForDecoratorError, _super);
    function InvalidMetadataForDecoratorError() {
        var _this = _super.call(this) || this;
        _this.message = 'Invalid metadata for this decorator';
        return _this;
    }
    return InvalidMetadataForDecoratorError;
}(Error));
exports.InvalidMetadataForDecoratorError = InvalidMetadataForDecoratorError;
var CannotSubscribeToPropertyError = /** @class */ (function (_super) {
    __extends(CannotSubscribeToPropertyError, _super);
    function CannotSubscribeToPropertyError() {
        var _this = _super.call(this) || this;
        _this.message = 'Cannot apply the subscribe decorator to a property';
        return _this;
    }
    return CannotSubscribeToPropertyError;
}(Error));
exports.CannotSubscribeToPropertyError = CannotSubscribeToPropertyError;
var NoClassDecoratorsAllowedError = /** @class */ (function (_super) {
    __extends(NoClassDecoratorsAllowedError, _super);
    function NoClassDecoratorsAllowedError() {
        var _this = _super.call(this) || this;
        _this.message = 'Cannot apply decorators to classes';
        return _this;
    }
    return NoClassDecoratorsAllowedError;
}(Error));
exports.NoClassDecoratorsAllowedError = NoClassDecoratorsAllowedError;
var isAccessor = function (args) { return !!args[2].get; };
var handlePropertyDecorator = function (metadata) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // if (metadata.type === SUBSCRIPTION_FUNCTION) {
    //   console.log('args', args);
    //   throw new CannotSubscribeToPropertyError();
    // }
    if (metadata.type === metadata_1.SUBSCRIPTION_FUNCTION) {
        metadata.payload.push(args[1]);
        console.log(metadata);
    }
    property_decorator_1.createPropertyDecorator(metadata).apply(_this, args);
};
var handleFunctionalDecorator = function (metadata) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    switch (metadata.type) {
        case metadata_1.MONO_OPERATOR:
            return isAccessor(args)
                ? accessor_decorator_1.createAccessorDecorator(metadata).apply(_this, args)
                : method_decorator_1.createMethodDecorator(metadata).apply(_this, args);
        case metadata_1.SUBSCRIPTION_FUNCTION:
            return subscription_decorator_1.createSubscriptionDecorator(metadata.payload).apply(_this, args);
        case metadata_1.MULTI_OPERATOR:
        case metadata_1.CREATION_OPERATOR:
            throw new InvalidMetadataForDecoratorError();
    }
};
exports.createDecorator = function (metadata) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args = args.filter(function (t) { return !!t; });
    switch (args.length) {
        case 1:
            throw new NoClassDecoratorsAllowedError();
        case 2:
            return handlePropertyDecorator.apply(void 0, [metadata].concat(args));
        case 3:
            return handleFunctionalDecorator.apply(void 0, [metadata].concat(args));
        default:
            throw new Error('Decorators are not valid here!');
    }
}; };
//# sourceMappingURL=core.js.map