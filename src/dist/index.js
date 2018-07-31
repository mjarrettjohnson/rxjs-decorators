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
var decorators_1 = require("./src/decorators");
var even = function (x) { return x % 2 === 0; };
var middleChange = function (a, b) {
    return a[1] === b[1];
};
var TestClass = /** @class */ (function (_super) {
    __extends(TestClass, _super);
    function TestClass() {
        var _this = _super.call(this) || this;
        _this.counter$ = rxjs_1.interval(1000);
        _this.counter$2 = rxjs_1.interval(500);
        _this.multiples$ = rxjs_1.interval(1000);
        _this.sideData = 'SIDE';
        _this.initialize();
        return _this;
    }
    // @Subscribe('counter$')
    TestClass.prototype.print = function (x) {
        console.log(this.sideData);
        console.log(x);
    };
    TestClass.prototype.multiply = function (x) {
        console.log(x);
    };
    __decorate([
        decorators_1.Transform(function (x) { return x * 2; }),
        __metadata("design:type", Object)
    ], TestClass.prototype, "counter$2", void 0);
    __decorate([
        decorators_1.Transform(function (x) { return x / 2; }),
        __metadata("design:type", Object)
    ], TestClass.prototype, "multiples$", void 0);
    __decorate([
        decorators_1.Transform(function (_a) {
            var x = _a[0], y = _a[1];
            return x + y;
        }),
        decorators_1.DistinctUntilChanged(middleChange),
        decorators_1.CombineLatest('counter$2', 'counter$'),
        __metadata("design:type", Object)
    ], TestClass.prototype, "combined$", void 0);
    __decorate([
        decorators_1.Transform(function (_a) {
            var x = _a[0], y = _a[1];
            return x * y;
        }),
        decorators_1.CombineLatest('combined$', 'multiples$'),
        __metadata("design:type", Object)
    ], TestClass.prototype, "combined2$", void 0);
    __decorate([
        decorators_1.Subscribe('combined2$'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TestClass.prototype, "multiply", null);
    return TestClass;
}(decorators_1.ReactiveModel));
exports.TestClass = TestClass;
var t = new TestClass();
//# sourceMappingURL=index.js.map