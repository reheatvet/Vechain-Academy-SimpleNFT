import {
  useWallet,
  useWalletModal
} from '@vechain/dapp-kit-react';
import { friendlyAddress } from '@vechain/dapp-kit-ui';
import { useEffect, useState } from 'react';
import { ThorClient } from "@vechain/sdk-network";
import { ABIContract, Address, Clause, VET } from "@vechain/sdk-core";
import SimpleNFTABI from "../../hardhat/artifacts/contracts/SimpleNFT/SimpleNFT.json";

const NFT_CONTRACT_ADDRESS = '0xB1368D33Ee21E5e6Ddd394ae77194DDD88967d46';
const NFT_CONTRACT_ABI = SimpleNFTABI.abi;
const THOR_URL = 'https://testnet.vechain.org';


function App() {
  const { open } = useWalletModal();
  const [buttonText, setButtonText] = useState('Connect Wallet');
  const [minting, setMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');
  const { account, signer } = useWallet();
  // console.log('Connected account:', account);


  useEffect(() => {
    if (account) {
      const address = friendlyAddress(account || '');
      setButtonText(`Connected: ${address}`);
    } else {
      setButtonText('Connect Wallet');
    }
  }, [account]);

  const mintNFT = async () => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }

    setMinting(true);
    setMintStatus("Minting in progress...");



    try {
      if (!signer) {
        throw new Error("Wallet signer not available");
      }

      const contractClause = Clause.callFunction(
        Address.of(NFT_CONTRACT_ADDRESS),
        ABIContract.ofAbi(NFT_CONTRACT_ABI).getFunction("mint"),
        [],
        VET.of(0),
        { comment: "Minting NFT" }
      );



      const tx = () => signer.sendTransaction({
        clauses: [
          {
            to: contractClause.to,
            value: contractClause.value.toString(),
            data: contractClause.data.toString(),
          },
        ],
        comment: "Minting an NFT",
      });

      const result = await tx();
      setMintStatus("Transaction sent. Waiting for confirmation...");

      // Wait for transaction confirmation
      const thorClient = ThorClient.at(THOR_URL);
      console.log(`THOR: ${THOR_URL}`)
      const txReceipt = await thorClient.transactions.waitForTransaction(result);

      if (txReceipt?.reverted) {
        setMintStatus("Minting failed! ❌");
      } else {
        setMintStatus("NFT minted successfully! ✅");
      }
    } catch (error) {
      console.error("Minting error:", error);
      setMintStatus(`Minting failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setMinting(false);
    }
  };


  return (
    <div className="container">
      <h1>NFT Minting Demo</h1>

      <div className="section">
        <h2>Wallet Connection</h2>
        <button onClick={open} disabled={minting}>
          {buttonText}
        </button>
      </div>

      {account && (
        <div className="section">
          <h2>NFT Minting</h2>
          <button
            onClick={mintNFT}
            disabled={minting}
          >
            {minting ? 'Minting...' : 'Mint NFT'}
          </button>
          {mintStatus && <p>{mintStatus}</p>}
        </div>
      )}
    </div>
  );
}

export default App;