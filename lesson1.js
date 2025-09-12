const bip39 = require('./bip39.js');

const entropy = Buffer.from('00000000000000000000000000000000', 'hex');
console.log('Entropy', entropy.toString('hex'));

//https://github.com/bitcoinjs/bip39/blob/a7ecbfe2e60d0214ce17163d610cad9f7b23140c/src/index.js#L57
const mnemonic = bip39.entropyToMnemonic(entropy);
console.log('Mnemonic', mnemonic);

//https://github.com/bitcoinjs/bip39/blob/a7ecbfe2e60d0214ce17163d610cad9f7b23140c/src/index.js#L139
console.log('Validate', bip39.validateMnemonic(mnemonic));

//https://github.com/bitcoinjs/bip39/blob/a7ecbfe2e60d0214ce17163d610cad9f7b23140c/src/index.js#L38
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log('Seed', seed.toString('hex'));

// https://iancoleman.io/bip39/
// 256비트 테스트