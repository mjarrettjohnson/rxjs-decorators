"use strict";
/**
 * @module operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function Select(selector) {
    var metadata = new metadata_1.SelectorMetadata({ selector: selector, name: 'Select' });
    return creation_1.createDecorator(metadata);
}
exports.Select = Select;
//# sourceMappingURL=select.js.map