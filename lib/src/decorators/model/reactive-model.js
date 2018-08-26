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
var retriever_1 = require("./retriever");
var ReactiveModel = /** @class */ (function () {
    function ReactiveModel(store) {
        this.store = store;
        this.subscriptions = [];
        this.propertyRetriever = new retriever_1.PropertyDataRetriever(this, store);
        this.subscriptionRetriever = new retriever_1.SubscriptionDataRetriever(this);
    }
    ReactiveModel.prototype.initialize = function () {
        this.propertyRetriever.retrieve();
        this.subscriptionRetriever.retrieve();
    };
    ReactiveModel.prototype.destroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ReactiveModel.prototype.resubscribe = function () {
        this.subscriptionRetriever.retrieve();
    };
    return ReactiveModel;
}());
exports.ReactiveModel = ReactiveModel;
var ReactiveComponent = /** @class */ (function (_super) {
    __extends(ReactiveComponent, _super);
    function ReactiveComponent(formModel) {
        var _this = _super.call(this) || this;
        _this.formModel = formModel;
        return _this;
    }
    return ReactiveComponent;
}(ReactiveModel));
exports.ReactiveComponent = ReactiveComponent;
//# sourceMappingURL=reactive-model.js.map