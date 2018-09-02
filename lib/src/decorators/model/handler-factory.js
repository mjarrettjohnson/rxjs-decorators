"use strict";
/**
 * @module model
 */
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
/**
 * Factory to determine which handler to use for the
 * decorated metadata.
 */
var HandlerFactory = /** @class */ (function () {
    function HandlerFactory() {
    }
    /**
     * Returns a handler for the specific type of metadata applied to
     * the model
     * @param type the metadata type
     */
    HandlerFactory.prototype.create = function (type) {
        switch (type) {
            case metadata_1.MONO_OPERATOR:
                return new metadata_1.MonoOperatorHandler();
            case metadata_1.CREATION_OPERATOR:
                return new metadata_1.CreationOperatorHandler();
            case metadata_1.MULTI_OPERATOR:
                return new metadata_1.MultiOperatorHandler();
            case metadata_1.MAP_TO_OPERATOR:
                return new metadata_1.MapToOperatorHandler();
            case metadata_1.MONO_OPERATOR_LIST:
                return new metadata_1.MonoOperatorListHandler();
            case metadata_1.SELECTOR_FUNCTION:
                return new metadata_1.SelectorFunctionHandler();
            case metadata_1.NEXT_OPERATOR:
                return new metadata_1.NextOperatorhandler();
            case metadata_1.INIT_OPERATOR:
                return new metadata_1.InitOperatorHandler();
            case metadata_1.SUBSCRIPTION_FUNCTION:
                return new metadata_1.SubscriptionHandler();
        }
    };
    return HandlerFactory;
}());
exports.HandlerFactory = HandlerFactory;
//# sourceMappingURL=handler-factory.js.map