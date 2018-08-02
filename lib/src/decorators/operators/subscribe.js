"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creation_1 = require("../creation");
var metadata_1 = require("../metadata");
function Subscribe(propertyNames) {
    return creation_1.createDecorator(new metadata_1.SubscriptionMetadata(propertyNames));
}
exports.Subscribe = Subscribe;
//# sourceMappingURL=subscribe.js.map