"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
exports.getterFactory = function (model) { return function (name) {
    return model[name];
}; };
exports.setterFactory = function (model, name) { return function (value) {
    model[name] = value;
}; };
exports.allParametersExist = function (that) { return function (property) {
    var get = exports.getterFactory(that);
    var observable = get(property);
    var error = errors_1.checkType(_this, observable, property, name);
    if (error) {
        throw error;
    }
    return observable;
}; };
//# sourceMappingURL=utils.js.map