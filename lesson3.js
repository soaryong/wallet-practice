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
async function checkETHBalance() {
  try {
    const balance = await provider.getBalance(wallet.address);
    const ethBalance = ethers.formatEther(balance);
    console.log('ETH Balance:', ethBalance, 'ETH');
  } catch (error) {
    console.log('ETH Balance 조회 실패:', error.message);
  }
}

async function checkTokenBalance() {
  const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // USDC on Sepolia
  const erc20ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
  ];

  const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
  const balance = await contract.balanceOf(wallet.address);
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const formattedBalance = ethers.formatUnits(balance, decimals);
  console.log(`${symbol} Balance`, formattedBalance, symbol);
  console.log('Token Address', tokenAddress);
}

checkETHBalance();
checkTokenBalance();