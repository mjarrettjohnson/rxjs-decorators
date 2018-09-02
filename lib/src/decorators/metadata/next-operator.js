"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var model_1 = require("../model");
exports.NEXT_OPERATOR = 'Next Operator';
var NextOperatorMetadata = /** @class */ (function () {
    function NextOperatorMetadata(payload) {
        this.payload = payload;
        this.type = exports.NEXT_OPERATOR;
    }
    return NextOperatorMetadata;
}());
exports.NextOperatorMetadata = NextOperatorMetadata;
/**
 * Handles NextOperatorHandler by calling next on the reactive model subject stored at the
 * supplied property name.
 */
var NextOperatorhandler = /** @class */ (function () {
    function NextOperatorhandler() {
    }
    /**
     * Retrieves the subject defined at the subject name and passes
     * all data flowing through the current observable pipeline to it.
     *
     * @param model the reactive model the decorator is applied to
     * @param propertyName the property the decorator is applied to
     * @param payload the next operator payload
     */
    NextOperatorhandler.prototype.handle = function (model, propertyName, payload) {
        var subjectName = payload.subjectName, name = payload.name;
        var get = model_1.getObservableFactory(model);
        var set = model_1.setterFactory(model, propertyName);
        var subject = get(subjectName);
        var error = model_1.checkType(model, subject, subjectName, name);
        if (error) {
            throw error;
        }
        var obs = get(propertyName).pipe(operators_1.tap(function (x) { return subject.next(x); }));
        set(obs);
    };
    return NextOperatorhandler;
}());
exports.NextOperatorhandler = NextOperatorhandler;
//# sourceMappingURL=next-operator.js.map