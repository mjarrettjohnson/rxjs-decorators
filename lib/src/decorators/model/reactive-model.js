"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var property_handler_1 = require("./property.handler");
var subscription_handler_1 = require("./subscription.handler");
/**
 * All classes that have decorators attached to them must extend
 * ReactiveModel. This class is responsible for retrieving and
 * handling all associated metadata as well as managing RXJS
 * subscriptions.
 */
var ReactiveModel = /** @class */ (function () {
    function ReactiveModel(store) {
        this.store = store;
        /**
         * A list of subscriptions to be destroyed
         */
        this.subscriptions = [];
        this.propertyHandler = new property_handler_1.PropertyMetadataHandler(this, store);
        this.subscriptionHandler = new subscription_handler_1.SubscriptionMetadataHandler(this);
    }
    /**
     * Retrieves and applies all metadata to the reactive model observables before
     * retrieving and applying the subscription metadata.
     */
    ReactiveModel.prototype.initialize = function () {
        this.propertyHandler.handle();
        this.subscriptionHandler.handle();
    };
    /**
     * Unsubscribes from all active subscriptions
     */
    ReactiveModel.prototype.destroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Retrieves all subscription metadata and resubscribes to
     * the associated observables.
     */
    ReactiveModel.prototype.resubscribe = function () {
        this.subscriptionHandler.handle();
    };
    return ReactiveModel;
}());
exports.ReactiveModel = ReactiveModel;
/**
 * Returns a function that when given a property name will return the observable stored on the model
 * at that location
 * @param model a reactive model that a decorator is applied to
 */
exports.getObservableFactory = function (model) { return function (name) {
    return model[name];
}; };
/**
 * Returns a function that when given a property name will return the function stored on the model
 * at that location
 * @param model a reactive model that a decorator is applied to
 */
exports.getFunctionFactory = function (model) { return function (name) {
    return model[name];
}; };
/**
 * Returns a function that when given an observable will store it at the property name provided.
 * @param model the reactive model the decorator is applied to
 * @param name the name of the property
 */
exports.setterFactory = function (model, name) { return function (value) {
    model[name] = value;
}; };
/**
 * Returns a function that when provided a property will determine if it exists on
 * the model AND is an observable. Used to map over a list of properties.
 * @param model the reactive model
 */
exports.allParametersExist = function (model) { return function (property) {
    var get = exports.getObservableFactory(model);
    var observable = get(property);
    var error = errors_1.checkType(_this, observable, property, name);
    if (error) {
        throw error;
    }
    return observable;
}; };
//# sourceMappingURL=reactive-model.js.map