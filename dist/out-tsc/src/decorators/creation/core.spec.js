"use strict";
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
var method_decorator_1 = require("./method-decorator");
var accessor_decorator_1 = require("./accessor-decorator");
var property_decorator_1 = require("./property-decorator");
var operators_1 = require("rxjs/operators");
var chai_1 = require("chai");
var rxjs_1 = require("rxjs");
var core_1 = require("./core");
var metadata_1 = require("../metadata");
describe('-> Create Method Decorator', function () {
    it('should throw an invalid return type error if no observable is returned', function () {
        var decorator = method_decorator_1.createMethodDecorator(new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'First' }));
        var Test = /** @class */ (function () {
            function Test() {
            }
            Test.prototype.method = function () { };
            __decorate([
                decorator,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Test.prototype, "method", null);
            return Test;
        }());
        var t = new Test();
        chai_1.expect(t.method.bind(t)).to.throw(new method_decorator_1.InvalidReturnType('Function must return an observable', t, 'method', 'First').message);
    });
    it('should return an observable with the attached operator', function () {
        var decorator = method_decorator_1.createMethodDecorator(new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'First' }));
        var Test = /** @class */ (function () {
            function Test() {
            }
            Test.prototype.method = function () {
                return rxjs_1.of(1);
            };
            __decorate([
                decorator,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Test.prototype, "method", null);
            return Test;
        }());
        var t = new Test();
        chai_1.expect(t.method().source.operator.constructor.name).to.eql('TakeOperator');
    });
});
describe('-> Create Accessor Decorator', function () {
    it('should throw an invalid return type error if no observable is returned', function () {
        var decorator = accessor_decorator_1.createAccessorDecorator(new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'First' }));
        var Test = /** @class */ (function () {
            function Test() {
            }
            Object.defineProperty(Test.prototype, "method", {
                get: function () {
                    return '';
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                decorator,
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [])
            ], Test.prototype, "method", null);
            return Test;
        }());
        var t = new Test();
        try {
            var a = t.method;
        }
        catch (error) {
            chai_1.expect(error.message).to.eq(new method_decorator_1.InvalidReturnType('Accessor must return an observable', t, 'method', 'First').message);
        }
    });
    it('should throw an Incorrect decorator type error when applied to a function', function () {
        var decorator = accessor_decorator_1.createAccessorDecorator(new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'First' }));
        try {
            var Test = /** @class */ (function () {
                function Test() {
                }
                Test.prototype.method = function () {
                    return rxjs_1.of(1);
                };
                __decorate([
                    decorator,
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Test.prototype, "method", null);
                return Test;
            }());
        }
        catch (e) {
            chai_1.expect(e.message).to.eq(new accessor_decorator_1.IncorrectDecoratorType('Accessor decorator cannot be applied to a function', { constructor: { name: 'Test' } }, 'method', 'First').message);
        }
    });
    it('should return an observable with the attached operator', function () {
        var decorator = accessor_decorator_1.createAccessorDecorator(new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'First' }));
        var Test = /** @class */ (function () {
            function Test() {
            }
            Object.defineProperty(Test.prototype, "method", {
                get: function () {
                    return rxjs_1.of(1);
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                decorator,
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [])
            ], Test.prototype, "method", null);
            return Test;
        }());
        var t = new Test();
        chai_1.expect(t.method.source.operator.constructor.name).to.eql('TakeOperator');
    });
});
describe('-> Create Property Decorator', function () {
    it('should create a new key on the metadata for an metadata payload', function () {
        var payload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var First = property_decorator_1.createPropertyDecorator(payload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                First,
                __metadata("design:type", Object)
            ], Test.prototype, "method", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('method');
        chai_1.expect(metadata.method).to.eql([payload]);
    });
    it('should handle adding multiple decorators', function () {
        var firstPayload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var distinctPayload = new metadata_1.MonoOperatorMetadata({
            operator: operators_1.distinctUntilChanged,
            fn: function () { },
            name: 'distinctUntilChanged',
        });
        var First = property_decorator_1.createPropertyDecorator(firstPayload);
        var DistinctUntilChanged = property_decorator_1.createPropertyDecorator(distinctPayload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                DistinctUntilChanged,
                First,
                __metadata("design:type", Object)
            ], Test.prototype, "method", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('method');
        chai_1.expect(metadata.method.length).to.eq(2);
    });
    it('should add decorators from bottom to top', function () {
        var firstPayload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var distinctPayload = new metadata_1.MonoOperatorMetadata({
            operator: operators_1.distinctUntilChanged,
            fn: function () { },
            name: 'distinctUntilChanged',
        });
        var First = property_decorator_1.createPropertyDecorator(firstPayload);
        var DistinctUntilChanged = property_decorator_1.createPropertyDecorator(distinctPayload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                DistinctUntilChanged,
                First,
                __metadata("design:type", Object)
            ], Test.prototype, "method", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('method');
        chai_1.expect(metadata.method).to.eql([firstPayload, distinctPayload]);
    });
    it('should handle adding different types of metadata', function () {
        var firstPayload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var combinePayload = new metadata_1.CreationOperatorMetadata({
            operator: rxjs_1.combineLatest,
            parameters: ['data$, id$'],
            name: 'combineLatest',
        });
        var withLatestPayload = new metadata_1.MultiOperatorMetadata({
            operator: operators_1.withLatestFrom,
            parameters: ['data$', 'id$'],
            name: 'withLatestFrom',
        });
        var First = property_decorator_1.createPropertyDecorator(firstPayload);
        var CombineLatest = property_decorator_1.createPropertyDecorator(combinePayload);
        var WithLatestFrom = property_decorator_1.createPropertyDecorator(withLatestPayload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                WithLatestFrom,
                First,
                CombineLatest,
                __metadata("design:type", Object)
            ], Test.prototype, "method", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('method');
        chai_1.expect(metadata.method).to.eql([combinePayload, firstPayload, withLatestPayload]);
    });
    it('should handle metadata to different properties', function () {
        var firstPayload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var combinePayload = new metadata_1.CreationOperatorMetadata({
            operator: rxjs_1.combineLatest,
            parameters: ['data$, id$'],
            name: 'combineLatest',
        });
        var withLatestPayload = new metadata_1.MultiOperatorMetadata({
            operator: operators_1.withLatestFrom,
            parameters: ['data$', 'id$'],
            name: 'withLatestFrom',
        });
        var First = property_decorator_1.createPropertyDecorator(firstPayload);
        var CombineLatest = property_decorator_1.createPropertyDecorator(combinePayload);
        var WithLatestFrom = property_decorator_1.createPropertyDecorator(withLatestPayload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                First,
                __metadata("design:type", Object)
            ], Test.prototype, "first", void 0);
            __decorate([
                WithLatestFrom,
                __metadata("design:type", Object)
            ], Test.prototype, "latest", void 0);
            __decorate([
                CombineLatest,
                __metadata("design:type", Object)
            ], Test.prototype, "combine", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('first');
        chai_1.expect(metadata).to.have.property('latest');
        chai_1.expect(metadata).to.have.property('combine');
        chai_1.expect(metadata.first).to.eql([firstPayload]);
        chai_1.expect(metadata.latest).to.eql([withLatestPayload]);
        chai_1.expect(metadata.combine).to.eql([combinePayload]);
    });
});
describe('-> Create Decorator', function () {
    it('should create a mono operator property decorator', function () {
        var payload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var First = core_1.createDecorator(payload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                First,
                __metadata("design:type", Object)
            ], Test.prototype, "method", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('method');
        chai_1.expect(metadata.method).to.eql([payload]);
    });
    it('should create a multi operator property decorator', function () {
        var combinePayload = new metadata_1.CreationOperatorMetadata({
            operator: rxjs_1.combineLatest,
            parameters: ['data$, id$'],
            name: 'combineLatest',
        });
        var CombineLatest = core_1.createDecorator(combinePayload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                CombineLatest,
                __metadata("design:type", Object)
            ], Test.prototype, "method", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('method');
        chai_1.expect(metadata.method).to.eql([combinePayload]);
    });
    it('should create a combination operator property decorator', function () {
        var withLatestPayload = new metadata_1.MultiOperatorMetadata({
            operator: operators_1.withLatestFrom,
            parameters: ['data$', 'id$'],
            name: 'withLatestFrom',
        });
        var WithLatestFrom = core_1.createDecorator(withLatestPayload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            __decorate([
                WithLatestFrom,
                __metadata("design:type", Object)
            ], Test.prototype, "method", void 0);
            return Test;
        }());
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, new Test());
        chai_1.expect(metadata).to.have.property('method');
        chai_1.expect(metadata.method).to.eql([withLatestPayload]);
    });
    it('should create a mono operator method decorator', function () {
        var payload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var First = core_1.createDecorator(payload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            Test.prototype.method = function () {
                return rxjs_1.of(1);
            };
            __decorate([
                First,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Test.prototype, "method", null);
            return Test;
        }());
        var t = new Test();
        chai_1.expect(t.method().source.operator.constructor.name).to.eql('TakeOperator');
    });
    it('should create a mono operator accessor decorator', function () {
        var payload = new metadata_1.MonoOperatorMetadata({ operator: operators_1.first, fn: function () { }, name: 'first' });
        var First = core_1.createDecorator(payload);
        var Test = /** @class */ (function () {
            function Test() {
            }
            Object.defineProperty(Test.prototype, "method", {
                get: function () {
                    return rxjs_1.of(1);
                },
                enumerable: true,
                configurable: true
            });
            __decorate([
                First,
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [])
            ], Test.prototype, "method", null);
            return Test;
        }());
        var t = new Test();
        chai_1.expect(t.method.source.operator.constructor.name).to.eql('TakeOperator');
    });
    it('should throw an error when a non mono operator  decorator is applied to a method', function () {
        var payload = new metadata_1.MultiOperatorMetadata({
            operator: operators_1.withLatestFrom,
            parameters: ['something'],
            name: 'withLatestFrom',
        });
        try {
            var WithLatest_1 = core_1.createDecorator(payload);
            var Test = /** @class */ (function () {
                function Test() {
                }
                Test.prototype.method = function () {
                    return rxjs_1.of(1);
                };
                __decorate([
                    WithLatest_1,
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], Test.prototype, "method", null);
                return Test;
            }());
            var t = new Test();
        }
        catch (e) {
            chai_1.expect(e.message).to.eq(new core_1.InvalidMetadataForDecoratorError().message);
        }
    });
    it('should throw an error when a non mono operator  decorator is applied to an accessor', function () {
        var payload = new metadata_1.MultiOperatorMetadata({
            operator: operators_1.withLatestFrom,
            parameters: ['something'],
            name: 'withLatestFrom',
        });
        try {
            var WithLatest_2 = core_1.createDecorator(payload);
            var Test = /** @class */ (function () {
                function Test() {
                }
                Object.defineProperty(Test.prototype, "method", {
                    get: function () {
                        return rxjs_1.of(1);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    WithLatest_2,
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], Test.prototype, "method", null);
                return Test;
            }());
            var t = new Test();
        }
        catch (e) {
            chai_1.expect(e.message).to.eq(new core_1.InvalidMetadataForDecoratorError().message);
        }
    });
});
//# sourceMappingURL=core.spec.js.map