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
/**
 * @module creation
 */
var metadata_1 = require("../metadata");
var accessor_decorator_1 = require("./accessor-decorator");
var method_decorator_1 = require("./method-decorator");
var property_decorator_1 = require("./property-decorator");
var subscription_decorator_1 = require("./subscription-decorator");
/**
 * Error that is thrown when the wrong type of operator is
 * applied to method decorator.
 */
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
/**
 * Currently unused.
 */
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
/**
 * An error that is thrown when a decorator is applied to
 * a class.
 */
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
/**
 * Determines if a the class property is a getter by checking if a
 * property with a get function exists.
 *
 * @param args the property associated with the decorator location
 */
var isGetter = function (args) { return !!args[2].get; };
/**
 * Stores context information in a classes metadata. This is used to provide a list
 * of rxjs operators and functions / data that is stored until the class has been
 * instantiated.
 *
 * These are then applied to an observable that is stored in the
 * property.
 *
 *
 * @param metadata function context that has been passed via a property decorator
 * @param args the arguments that were passed from the decorator itself.
 */
var handlePropertyDecorator = function (metadata) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (metadata.type === metadata_1.SUBSCRIPTION_FUNCTION) {
        metadata.payload.push(args[1]);
    }
    property_decorator_1.createPropertyDecorator(metadata).apply(_this, args);
};
/**
 *
 * Stores context information in a classes metadata. This is used to provide a list
 * of rxjs operators and functions / data that is stored until the class has been
 * instantiated.
 *
 * @param metadata function context that has been passed via a method decorator
 * @param args the arguments that were passed from the decorator itself.
 */
var handleFunctionalDecorator = function (metadata) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    switch (metadata.type) {
        case metadata_1.MONO_OPERATOR:
            return isGetter(args)
                ? accessor_decorator_1.createAccessorDecorator(metadata).apply(_this, args)
                : method_decorator_1.createMethodDecorator(metadata).apply(_this, args);
        case metadata_1.SUBSCRIPTION_FUNCTION:
            return subscription_decorator_1.createSubscriptionDecorator.apply(void 0, metadata.payload).apply(_this, args);
        case metadata_1.MULTI_OPERATOR:
        case metadata_1.CREATION_OPERATOR:
            throw new InvalidMetadataForDecoratorError();
    }
};
/**
 *
 * Stores Context information in a classes metadata. This information is stored via
 * the property key that the decorator is applied to.
 *
 * When a class is instantiated a corresponding
 * metadata handler is created which take the provided metadata and applies it to the
 * property (be that property, accessor or method).
 *
 * Class handlers exist for each metadata type which know the way to retrieve and use this
 * context.
 *
 * @example export interface MonoOperatorPayload {
 *  operator: MonoOperatorFn;
 *  name: string;
 *  fn: Callable;
 *  isBound?: boolean;
 * }
 *
 * export class MonoOperatorHandler implements MetadataHandler {
 *  handle(model: ReactiveModel, propertyName: string, payload: MonoOperatorPayload) {
 *    const { operator, name, isBound } = payload;
 *    let fn = payload.fn;
 *
 *    // returns a function that when given a property name will retrieve it from the provided model
 *    const get = getterFactory(model);
 *
 *    // returns a function that when given a model and property name will store a provided parameter there
 *    const set = setterFactory(model, propertyName);
 *
 *    const observable: Observable<any> = get(propertyName);
 *
 *
 *    if (isBound && typeof fn === 'function') {
 *      fn = fn.bind(this);
 *    }
 *
 *    const error = checkType(model, observable, propertyName, name);
 *
 *    if (error) {
 *      throw error;
 *    }
 *
 *    set(observable.pipe(operator(fn)));
 *   }
 * }
 *
 * @param metadata object that contains the information you wish to store
 * in a classes metadata.
 * @param args the arguments that are supplied to a decorator function that
 * vary depending on what type of decorator is being created
 */
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