const bip39 = require('bip39');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const { ethers } = require('ethers');

const bip32 = BIP32Factory(ecc);

const entropy = Buffer.from('00000000000000000000000000000000', 'hex');
const mnemonic = bip39.entropyToMnemonic(entropy);
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log('Seed', seed.toString('hex'));

//bip-32
const root = bip32.fromSeed(seed);
console.log('Root Private Key', Buffer.from(root.privateKey).toString('hex'));
console.log('Root Public Key', root.publicKey.toString('hex'));
console.log('Root Chain Code', root.chainCode.toString('hex'));

//bip-44
const purpose = root.derive(44 + 0x80000000);
const coinType = purpose.derive(60 + 0x80000000);
const account = coinType.derive(0 + 0x80000000);
const change = account.derive(0);
const child = change.derive(0);
const privateKey = Buffer.from(child.privateKey).toString('hex');
const publicKey = Buffer.from(child.publicKey).toString('hex');
const wallet = new ethers.Wallet('0x' + privateKey);
const address = wallet.address;
console.log('Address', address);
console.log('Public Key', publicKey);
console.log('Private Key', privateKey);