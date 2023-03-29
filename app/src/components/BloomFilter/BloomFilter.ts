import * as crypto from 'crypto';
// gross, but works for the moment
import BitArray from '/node_modules/@bitarray/es6/dist/cjs/src/bitarray.js';

// tsc --downlevelIteration  BloomFilter.ts

class BloomFilter {
    bf_len: number;
    bf_num_hash_func: number;

    constructor(bf_len: number, bf_num_hash_func: number) {
        this.bf_len = bf_len;
        this.bf_num_hash_func = bf_num_hash_func;
    }

    set_to_bloom_filter(val_set: string[]) {
        console.log('!!');

        console.log('bf_len: ', this.bf_len);
        console.log('bf_num_hash_func', this.bf_num_hash_func);

        let bloom_set = new BitArray(this.bf_len);

        val_set.forEach((val) => {
            console.log('val: ', val);
            const hash1 = crypto.createHash('sha1').update(val).digest('hex');
            console.log('hash1: ', hash1);
            // need to convert hex to BigInt to avoid rounding/inaccuracy issues
            const int1 = BigInt('0x' + hash1);
            console.log('int1: ', int1);
            const hash2 = crypto.createHash('md5').update(val).digest('hex');
            console.log('hash2: ', hash2);
            // need to convert hex to BigInt to avoid rounding/inaccuracy issues
            const int2 = BigInt('0x' + hash2);
            console.log(int2);

            for (const i of Array(this.bf_num_hash_func).keys()) {
                console.log('i: ', i);
                // need a BigInt cast so we can do BigInt math
                const _i = BigInt(i);
                let gi = int1 + _i*int2;
                console.log('gi: ', gi);
                // since gi is already a BigInt bc int1 and 2 are BigInts, we need to cast bf_len as well
                gi = gi % BigInt(this.bf_len);
                console.log('gi: ', gi);
                bloom_set[gi] = true;
                console.log(String(bloom_set));
            };
            console.log('\n\n');
        });

        const bloom_set_string = String(bloom_set).split(' ').join('');
        console.log(bloom_set_string);
    }
}

// export default BloomFilter;

console.log('start');

// const bf = new BloomFilter({bf_len:300, bf_num_hash_func:20});
const bf = new BloomFilter(300, 20);
bf.set_to_bloom_filter(["hello", "world"]);

console.log('end');
