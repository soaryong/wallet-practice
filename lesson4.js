const bip39 = require('bip39');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const { ethers } = require('ethers');

const bip32 = BIP32Factory(ecc);

const entropy = Buffer.from('00000000000000000000000000000000', 'hex');
const mnemonic = bip39.entropyToMnemonic(entropy);
const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bip32.fromSeed(seed);

const ethChild = root.derivePath("m/44'/60'/0'/0/0");
const privateKey = Buffer.from(ethChild.privateKey).toString('hex');
const wallet = new ethers.Wallet('0x' + privateKey);
console.log('Address:', wallet.address);
console.log('Private Key:', privateKey);

const RPC_URL = '';
const provider = new ethers.JsonRpcProvider(RPC_URL);
const connectedWallet = wallet.connect(provider);

async function sendETH() {
  const toAddress = '';
  const amount = '';

  const tx = {
    to: toAddress,
    value: ethers.parseEther(amount),
    gasLimit: 21000,
  };

  const feeData = await provider.getFeeData();
  tx.gasPrice = feeData.gasPrice;

  const txResponse = await connectedWallet.sendTransaction(tx);
  console.log('Transaction Hash', txResponse.hash);
  const receipt = await txResponse.wait();
  console.log('Block', receipt.blockNumber);
  console.log('Etherscan', `https://sepolia.etherscan.io/tx/${txResponse.hash}`);
}

async function sendToken() {
  const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // USDC on Sepolia
  const toAddress = '';
  const amount = '';

  const erc20ABI = [
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
  ];

  const contract = new ethers.Contract(tokenAddress, erc20ABI, connectedWallet);
  const decimals = await contract.decimals();

  const txResponse = await contract.transfer(
    toAddress,
    ethers.parseUnits(amount, decimals)
  );
  console.log('Transaction Hash', txResponse.hash);

  const receipt = await txResponse.wait();
  console.log('Block', receipt.blockNumber);
  console.log('Etherscan', `https://sepolia.etherscan.io/tx/${txResponse.hash}`);
}

sendETH();
sendToken();
