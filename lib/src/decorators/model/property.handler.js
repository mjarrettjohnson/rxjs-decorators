"use strict";
/**
 * @module model
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../metadata");
var handler_factory_1 = require("./handler-factory");
/**
 * Retrieves the property metadata that has been applied to a reactive model and
 * determines how to handle the metadata.
 */
var PropertyMetadataHandler = /** @class */ (function () {
    /**
     * @param model the reactive model
     * @param store an NgRx Store
     */
    function PropertyMetadataHandler(model, store) {
        var _this = this;
        this.model = model;
        /**
         * Returns a function that when given a key will handle the metadata located at that key
         * @param metadata the retrieved metadata
         */
        this.handlePropertyMetadata = function (metadata) { return function (metadataKey) {
            var propertyMetadata = metadata[metadataKey];
            propertyMetadata.forEach(_this.selectPropertyDecoratorHandler(metadataKey));
        }; };
        /**
         * Retruns a function that when given a metadata context will call the correct
         * metadata handler
         * @param propertyName the property the decorator is applied to
         */
        this.selectPropertyDecoratorHandler = function (propertyName) { return function (current) {
            var handler = new handler_factory_1.HandlerFactory().create(current.type);
            handler.handle(_this.model, propertyName, current.payload);
        }; };
    }
    /**
     * Retrieves all property metadata and handles each piece of metadata found
     */
    PropertyMetadataHandler.prototype.handle = function () {
        var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, this.model);
        if (!metadata) {
            return;
        }
        Object.keys(metadata).forEach(this.handlePropertyMetadata(metadata));
    };
    return PropertyMetadataHandler;
}());
exports.PropertyMetadataHandler = PropertyMetadataHandler;
//# sourceMappingURL=property.handler.js.map