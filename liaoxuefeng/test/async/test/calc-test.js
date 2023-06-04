const assert = require('assert');
const calc = require('../calc');

describe('#async calc', () => {
    describe('#asyncCalculate()', () => {
        it('#async with done', (done) => {
            (async function () {
                try {
                    let r = await calc();
                    assert.strictEqual(r, 15);
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        });

        it('#async function', async () => {
            let r = await calc();
            assert.strictEqual(r, 15);
        });

        it('#sync function', () => {
            assert(true);
        });
    });
});
