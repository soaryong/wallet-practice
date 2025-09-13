# Wallet Practice

```bash
# 의존성 설치
npm install

# 레슨별 실습
npm run lesson1  # 엔트로피, 니모닉, 시드 생성
npm run lesson2  # HD 월렛, 키 유도  
npm run lesson3  # 잔고 조회, ERC-20 토큰
npm run lesson4  # 트랜잭션 전송
node lesson5.js  # Sui 블록체인 실습
```

## 📚 학습 과정

### 🎯 **Lesson 1: BIP39 기초**
- ✅ 엔트로피(128비트) 생성
- ✅ SHA256 해시 계산
- ✅ 체크섬 추출 (앞 4비트)
- ✅ 니모닉(12단어) 생성
- ✅ 시드(512비트) 생성 (PBKDF2)

```bash
npm run lesson1
```

### 🔑 **Lesson 2: BIP32 HD 월렛**
- ✅ 루트 키 생성 (BIP32)
- ✅ Derivation Path: `m/44'/60'/0'/0/0`
- ✅ 이더리움 개인키/공개키 생성
- ✅ 이더리움 주소 생성

```bash
npm run lesson2
```

### 🌐 **Lesson 3: 블록체인 상호작용**
- ✅ RPC 연결 (Sepolia 테스트넷)
- ✅ ETH 잔고 조회
- ✅ ERC-20 토큰 잔고 조회
- ✅ 실시간 블록체인 데이터 확인

```bash
npm run lesson3
```

### 💸 **Lesson 4: 트랜잭션 전송**
- ✅ ETH 전송 트랜잭션 생성
- ✅ ERC-20 토큰 전송
- ✅ Gas 계산 및 최적화
- ✅ 트랜잭션 추적 (Etherscan 링크)

```bash
npm run lesson4
```

### 🔗 **Lesson 5: Sui 블록체인**
- ✅ 니모닉 기반 Sui 주소 생성
- ✅ Sui 테스트넷 연결
- ✅ SUI 잔고 조회
- ✅ SUI 토큰 전송
- ✅ 가스비 추정 및 최적화
- ✅ 트랜잭션 추적 (Sui Explorer 링크)

```bash
node lesson5.js
```