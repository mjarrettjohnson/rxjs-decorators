"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var utils_1 = require("./utils");
var SelectorFunctionHandler = /** @class */ (function () {
    function SelectorFunctionHandler() {
    }
    SelectorFunctionHandler.prototype.handle = function (model, propertyName, payload) {
        var selector = payload.selector;
        if (!model.store) {
            throw new errors_1.NoStoreProvidedError(model, propertyName);
        }
        var set = utils_1.setterFactory(model, propertyName);
        set(model.store.select(selector));
    };
    return SelectorFunctionHandler;
}());
exports.SelectorFunctionHandler = SelectorFunctionHandler;
//# sourceMappingURL=selector-function.handler.js.map