"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../../metadata");
var handler_1 = require("../handler");
var PropertyDataRetriever = /** @class */ (function () {
    function PropertyDataRetriever(model, store) {
        var _this = this;
        this.model = model;
        this.handlePropertyMetadata = function (metadata) { return function (metadataKey) {
            var propertyMetadata = metadata[metadataKey];
            propertyMetadata.forEach(_this.selectPropertyDecoratorHandler(metadataKey));
        }; };
        this.selectPropertyDecoratorHandler = function (propertyName) { return function (current) {
            var handler = new handler_1.HandlerFactory().create(current.type);
            handler.handle(_this.model, propertyName, current.payload);
        }; };
    }
    PropertyDataRetriever.prototype.retrieve = function () {
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, this.model);
        if (!metadata) {
            return;
        }
        Object.keys(metadata).forEach(this.handlePropertyMetadata(metadata));
    };
    return PropertyDataRetriever;
}());
exports.PropertyDataRetriever = PropertyDataRetriever;
//# sourceMappingURL=property.retriever.js.map