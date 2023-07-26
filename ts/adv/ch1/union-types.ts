export class RangeValidationBase {
    constructor(private start: number, private end: number) { }

    protected RangeCheck(value: number): boolean {
        return value >= this.start && value <= this.end;
    }

    protected GetNumber(value: string): number {
        return new Number(value).valueOf();
    }
}

class UnionRangeValidation extends RangeValidationBase {
    IsInRange(value: string | number): boolean {
        if (typeof value === 'number') {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}

const validator = new UnionRangeValidation(10, 20);

function validate(input: string | number) {
    if (validator.IsInRange(input)) {
        console.log(`${input} is in the range 10 to 20`);
    } else {
        console.log(`${input} is not in the range 10 to 20`);
    }
}

validate("15.12343");
validate("20");
validate("22");
validate(18);
validate("jack");
