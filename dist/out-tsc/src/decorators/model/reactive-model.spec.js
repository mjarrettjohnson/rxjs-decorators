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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var creation_1 = require("../creation");
var reactive_model_1 = require("./reactive-model");
var utils_1 = require("../utils");
var metadata_1 = require("../metadata");
describe(' -> Reactive Model', function () {
    it('should', function () {
        var First = creation_1.createDecorator(new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: utils_1.noop, name: 'first' }));
        var ScreamEven = creation_1.createDecorator(new metadata_1.MonoOperatorListMetadata({
            operators: [operators_1.filter, operators_1.map, operators_1.map, operators_1.map],
            fns: [
                function (x) { return x % 2 === 0; },
                function (x) { return "" + x; },
                function (x) { return x.toUpperCase(); },
                function (x) { return x + "!!!"; },
            ],
            name: 'ScreamEven',
        }));
        var Transform = function (fn) {
            return creation_1.createDecorator(new metadata_1.MonoOperatorMetadata({
                operator: operators_1.map,
                fn: fn,
                name: 'map',
                isBound: true,
            }));
        };
        var SwitchMap = function (fnName) {
            return creation_1.createDecorator(new metadata_1.MapToOperatorMetadata({
                operator: operators_1.switchMap,
                functionName: fnName,
                name: 'switchMap',
            }));
        };
        var Combine = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return creation_1.createDecorator(new metadata_1.CreationOperatorMetadata({ operator: rxjs_1.combineLatest, parameters: args, name: 'combineLatest' }));
        };
        var WithLatest = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return creation_1.createDecorator(new metadata_1.MultiOperatorMetadata({
                operator: operators_1.withLatestFrom,
                parameters: args,
                name: 'withLatestFrom',
            }));
        };
        var square = function (x) { return x * x; };
        var Subscribe = creation_1.createSubscriptionDecorator;
        var Test = /** @class */ (function (_super) {
            __extends(Test, _super);
            function Test() {
                var _this = _super.call(this) || this;
                _this.prop = 'im private';
                _this.one$ = rxjs_1.of(1);
                _this.hello$ = rxjs_1.interval(1000);
                _this.initialize();
                return _this;
            }
            Test.prototype.toString = function (x) {
                return rxjs_1.of("" + x);
            };
            Test.prototype.switchToTwo = function (_a) {
                var x = _a[0], y = _a[1];
                console.log(x, y);
                return rxjs_1.of(x + y);
            };
            Test.prototype.handle = function (x) {
                console.log(x);
            };
            __decorate([
                ScreamEven,
                __metadata("design:type", Object)
            ], Test.prototype, "hello$", void 0);
            __decorate([
                Subscribe('hello$'),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], Test.prototype, "handle", null);
            return Test;
        }(reactive_model_1.ReactiveModel));
        var t = new Test();
    });
});
//# sourceMappingURL=reactive-model.spec.js.map