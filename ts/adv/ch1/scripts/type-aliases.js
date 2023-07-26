"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const union_types_1 = require("./union-types");
class UnionRangeValidationWithTypeAlias extends union_types_1.RangeValidationBase {
    IsInRange(value) {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        else {
            return this.RangeCheck(this.GetNumber(value));
        }
    }
}
let total = 10;
if (new UnionRangeValidationWithTypeAlias(0, 100).IsInRange(total)) {
    console.log(`This value is in range`);
}
