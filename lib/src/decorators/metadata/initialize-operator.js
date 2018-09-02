"use strict";
/**
 * @module metadata
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var model_1 = require("../model");
exports.INIT_OPERATOR = 'Initialize Operator';
/**
 *
 * A metadata type that stores an observable onto a property
 * of a reactive model. Used to initialize a stream.
 *
 */
var InitOperatorMetadata = /** @class */ (function () {
    function InitOperatorMetadata(payload) {
        this.payload = payload;
        this.type = exports.INIT_OPERATOR;
    }
    return InitOperatorMetadata;
}());
exports.InitOperatorMetadata = InitOperatorMetadata;
/**
 * Handles all InitOperatorMetadata applied to a ReactiveModel.
 */
var InitOperatorHandler = /** @class */ (function () {
    function InitOperatorHandler() {
    }
    /**
     * Retrieves the observable stored in the metadata payload
     * and sets the value of the property to that observable.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the init operator payload
     */
    InitOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var observable = payload.observable;
        if (!observable || !rxjs_1.isObservable(observable)) {
            throw new Error('Observable was undefined');
        }
        var set = model_1.setterFactory(model, propertyName);
        set(observable);
    };
    return InitOperatorHandler;
}());
exports.InitOperatorHandler = InitOperatorHandler;
//# sourceMappingURL=initialize-operator.js.map