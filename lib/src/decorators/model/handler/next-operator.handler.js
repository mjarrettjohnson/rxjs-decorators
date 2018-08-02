"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var errors_1 = require("../errors");
var utils_1 = require("./utils");
var NextOperatorhandler = /** @class */ (function () {
    function NextOperatorhandler() {
    }
    NextOperatorhandler.prototype.handle = function (model, propertyName, payload) {
        var subjectName = payload.subjectName, name = payload.name;
        var get = utils_1.getterFactory(model);
        var set = utils_1.setterFactory(model, propertyName);
        var subject = get(subjectName);
        var error = errors_1.checkType(model, subject, subjectName, name);
        if (error) {
            throw error;
        }
        var obs = get(propertyName).pipe(operators_1.tap(function (x) { return subject.next(x); }));
        set(obs);
    };
    return NextOperatorhandler;
}());
exports.NextOperatorhandler = NextOperatorhandler;
//# sourceMappingURL=next-operator.handler.js.map