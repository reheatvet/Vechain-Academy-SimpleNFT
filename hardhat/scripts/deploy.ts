import { ethers } from "hardhat";

async function main() {
  const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
  const nft = await SimpleNFT.deploy();
  
  await nft.waitForDeployment();
  
  console.log(`SimpleNFT deployed to: ${await nft.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});