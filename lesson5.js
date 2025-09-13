const { Ed25519Keypair } = require('@mysten/sui/keypairs/ed25519');
const { SuiClient } = require('@mysten/sui/client');
const { Transaction } = require('@mysten/sui/transactions');
const bip39 = require('bip39');

// 1. 니모닉 기반으로 주소 생성
function createWalletFromMnemonic(mnemonic) {
  const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
  const address = keypair.getPublicKey().toSuiAddress();
  
  console.log('Sui Address:', address);
  console.log('Public Key:', keypair.getPublicKey().toBase64());
  
  return { keypair, address };
}

// 2. 잔액 확인 함수
async function checkBalance(client, address) {
  try {
    const balance = await client.getBalance({ owner: address });
    console.log(`현재 잔액: ${balance.totalBalance} MIST (${balance.totalBalance / 1000000000} SUI)`);
    return balance.totalBalance;
  } catch (error) {
    console.error('잔액 확인 실패:', error.message);
    return 0;
  }
}

// 3. SUI 전송 함수
async function sendSUI() {
  const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'; // 테스트용 니모닉
  const { keypair, address } = createWalletFromMnemonic(mnemonic);
  
  const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });
  
  // 잔액 확인
  const balance = await checkBalance(client, address);
  if (balance === 0) {
    console.log('잔액이 없습니다. 테스트넷 faucet에서 SUI를 받아주세요.');
    return;
  }
  
  const toAddress = '0x1234567890123456789012345678901234567890123456789012345678901234'; // 테스트용 주소
  const amount = 100000; // 0.0001 SUI (가스비를 고려해서 적은 금액으로 설정)
  
  if (!toAddress) {
    console.log('받을 주소를 입력해주세요');
    return;
  }
  
  try {
    const txb = new Transaction();
    txb.setSender(address);
    const [coin] = txb.splitCoins(txb.gas, [amount]);
    txb.transferObjects([coin], toAddress);
    
    // 가스비 추정
    const dryRunResult = await client.dryRunTransactionBlock({
      transactionBlock: await txb.build({ client }),
    });
    console.log('예상 가스비:', dryRunResult.effects.gasUsed);
    
    const result = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: txb,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });
    
    console.log('✅ 전송 성공!');
    console.log('Transaction Hash:', result.digest);
    console.log('Gas Used:', result.effects.gasUsed);
    console.log('Sui Explorer:', `https://testnet.suivision.xyz/txblock/${result.digest}`);
  } catch (error) {
    console.error('❌ Transaction failed:', error.message);
  }
}

sendSUI();

//https://suiscan.xyz/testnet/account/0x5e93a736d04fbb25737aa40bee40171ef79f65fae833749e3c089fe7cc2161f1