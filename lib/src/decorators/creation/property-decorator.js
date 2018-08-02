"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_1 = require("../metadata");
var utils_1 = require("../utils");
exports.createPropertyDecorator = function (payload) { return function (target, key) {
    var metadata = Reflect.getMetadata(metadata_1.PROP_METADATA, target) || {};
    if (!utils_1.propertyExists(metadata, key)) {
        metadata[key] = [payload];
    }
    else {
        metadata[key] = metadata[key].concat([payload]);
    }
    Reflect.defineMetadata(metadata_1.PROP_METADATA, metadata, target);
}; };
// const createPropertyDecorator = <T, K>(operator: UnaryFunction<T, K>, metadata: string, ...propertyName: string[]) => (
//   target: object,
//   key: string
// ) => {
//   const existingMeta = Reflect.getMetadata(PROP_METADATA, target) || {} as MetaData;
//   let currentData: MetaData[] = existingMeta[key]
//   let newData: MetaData
//   const t = operator;
//   if (metadata === COMBINATION_METADATA) {
//     newData = {
//       operator: null,
//       combinator: {
//         secondObservable: propertyName,
//         operator: t,
//       }
//     }
//   } else {
//     newData = { operator, combinator: null };
//   }
//   if (existingMeta[key]) {
//     existingMeta[key] = [].concat(existingMeta[key], newData);
//   } else {
//     existingMeta[key] = [newData];
//   }
//   Reflect.defineMetadata(PROP_METADATA, existingMeta, target);
// };
//# sourceMappingURL=property-decorator.js.map