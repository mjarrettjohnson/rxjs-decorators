"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
exports.SELECTOR_FUNCTION = 'Selector Function';
var SelectorMetadata = /** @class */ (function () {
    function SelectorMetadata(payload) {
        this.payload = payload;
        this.type = exports.SELECTOR_FUNCTION;
    }
    return SelectorMetadata;
}());
exports.SelectorMetadata = SelectorMetadata;
/**
 * Handles SelectorMetada by applying the selector to the provided
 * ngrx store
 */
var SelectorFunctionHandler = /** @class */ (function () {
    function SelectorFunctionHandler() {
    }
    /**
     * Uses the supplied selector function and passes it to the store
     * observable storing the resultant observable value at the property
     * the decorator is applied to.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the selector function
     */
    SelectorFunctionHandler.prototype.handle = function (model, propertyName, payload) {
        var selector = payload.selector;
        if (!model.store) {
            throw new model_1.NoStoreProvidedError(model, propertyName);
        }
        var set = model_1.setterFactory(model, propertyName);
        set(model.store.select(selector));
    };
    return SelectorFunctionHandler;
}());
exports.SelectorFunctionHandler = SelectorFunctionHandler;
//# sourceMappingURL=selectors.js.map