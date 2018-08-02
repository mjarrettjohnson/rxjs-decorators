"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var utils_1 = require("./utils");
var InitOperatorHandler = /** @class */ (function () {
    function InitOperatorHandler() {
    }
    InitOperatorHandler.prototype.handle = function (model, propertyName, payload) {
        var name = payload.name, observable = payload.observable;
        if (!observable || !rxjs_1.isObservable(observable)) {
            throw new Error('Observable was undefined');
        }
        var set = utils_1.setterFactory(model, propertyName);
        set(observable);
    };
    return InitOperatorHandler;
}());
exports.InitOperatorHandler = InitOperatorHandler;
//# sourceMappingURL=init-operator.handler.js.map