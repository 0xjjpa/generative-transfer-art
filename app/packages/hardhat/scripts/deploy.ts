// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract } from 'ethers';
import { config, ethers } from 'hardhat';
import fs from 'fs';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  try {
    fs.unlinkSync(`${config.paths.artifacts}/contracts/contractAddress.ts`);
  } catch {
    console.log('No previous contract address was found.')
  }

  // We get the contract to deploy
  const YourContract = await ethers.getContractFactory('TransferArt');
  const contract = await YourContract.deploy('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4');
  await contract.deployed();
  saveFrontendFiles(contract, "TransferArt");
  console.log('YourContract deployed to:', contract.address);

  const MulticallContract = await ethers.getContractFactory('Multicall');
  const multicallContract = await MulticallContract.deploy();
  await multicallContract.deployed();
  saveFrontendFiles(multicallContract, "MulticallContract");
  console.log('Multicall deployed to:', multicallContract.address);
}

// https://github.com/nomiclabs/hardhat-hackathon-boilerplate/blob/master/scripts/deploy.js
function saveFrontendFiles(contract: Contract, contractName: string) {
  fs.appendFileSync(
    `${config.paths.artifacts}/contracts/contractAddress.ts`,
    `export const ${contractName} = '${contract.address}'\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
