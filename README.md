# Vechain Academy Demo App

A simple NFT minting demo for the Vechain Academy.  
It's a great starting point for my learning of web3 development on Vechain!

![banner](./images/banner.png "Banner")

## Features
- Connect your Vechain wallet (VeWorld, Sync 2, or compatible)
- Mint a SimpleNFT on testnet

## Contract Details
**Testnet Contract Address**: [0xB1368D33Ee21E5e6Ddd394ae77194DDD88967d46](https://explore-testnet.vechain.org/accounts/0xb1368d33ee21e5e6ddd394ae77194ddd88967d46)  
**Transactions**: [View on Explorer](https://explore-testnet.vechain.org/accounts/0xb1368d33ee21e5e6ddd394ae77194ddd88967d46/txs)

## How to Use
1. Connect your wallet (ensure you're on Vechain Testnet)
2. Click "Mint NFT"
3. Sign the transaction
4. Your SimpleNFT will be sent to your connected wallet

## Development

### Project Structure
- /client 
    - Frontend application
- /hardhat
    - Hardhat & Smart contract code


## Running Locally

To run this application locally, follow these steps:

```bash
# 1. Clone the repo
git clone https://github.com/reheatvet/Vechain-Academy-SimpleNFT.git

# 2. Navigate to the clients directory
cd clients

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Use the dApp
Open your browser at http://localhost:5173/
