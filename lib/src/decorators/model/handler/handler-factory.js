"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../../metadata");
var creation_operator_handler_1 = require("./creation-operator.handler");
var init_operator_handler_1 = require("./init-operator.handler");
var map_to_operator_handler_1 = require("./map-to-operator.handler");
var mono_operator_list_handler_1 = require("./mono-operator-list.handler");
var mono_operator_handler_1 = require("./mono-operator.handler");
var multi_operator_handler_1 = require("./multi-operator.handler");
var next_operator_handler_1 = require("./next-operator.handler");
var selector_function_handler_1 = require("./selector-function.handler");
var subscription_handler_1 = require("./subscription.handler");
var HandlerFactory = /** @class */ (function () {
    function HandlerFactory() {
    }
    HandlerFactory.prototype.create = function (type) {
        switch (type) {
            case metadata_1.MONO_OPERATOR:
                return new mono_operator_handler_1.MonoOperatorHandler();
            case metadata_1.CREATION_OPERATOR:
                return new creation_operator_handler_1.CreationOperatorHandler();
            case metadata_1.MULTI_OPERATOR:
                return new multi_operator_handler_1.MultiOperatorHandler();
            case metadata_1.MAP_TO_OPERATOR:
                return new map_to_operator_handler_1.MapToOperatorHandler();
            case metadata_1.MONO_OPERATOR_LIST:
                return new mono_operator_list_handler_1.MonoOperatorListHandler();
            case metadata_1.SELECTOR_FUNCTION:
                return new selector_function_handler_1.SelectorFunctionHandler();
            case metadata_1.NEXT_OPERATOR:
                return new next_operator_handler_1.NextOperatorhandler();
            case metadata_1.INIT_OPERATOR:
                return new init_operator_handler_1.InitOperatorHandler();
            case metadata_1.SUBSCRIPTION_FUNCTION:
                return new subscription_handler_1.SubscriptionHandler();
        }
    };
    return HandlerFactory;
}());
exports.HandlerFactory = HandlerFactory;
//# sourceMappingURL=handler-factory.js.map