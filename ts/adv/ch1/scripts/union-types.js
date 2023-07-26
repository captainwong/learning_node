"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeValidationBase = void 0;
class RangeValidationBase {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    RangeCheck(value) {
        return value >= this.start && value <= this.end;
    }
    GetNumber(value) {
        return new Number(value).valueOf();
    }
}
exports.RangeValidationBase = RangeValidationBase;
class UnionRangeValidation extends RangeValidationBase {
    IsInRange(value) {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}
const validator = new UnionRangeValidation(10, 20);
function validate(input) {
    if (validator.IsInRange(input)) {
        console.log(`${input} is in the range 10 to 20`);
    }
    else {
        console.log(`${input} is not in the range 10 to 20`);
    }
}
validate("15.12343");
validate("20");
validate("22");
validate(18);
validate("jack");
