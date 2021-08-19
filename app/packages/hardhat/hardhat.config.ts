import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-deploy'
import { task } from 'hardhat/config';
import { HardhatUserConfig } from 'hardhat/types';
require('dotenv').config()


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (_args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


const { ALCHEMY_API_KEY } = process.env

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: '0.8.6',
  paths: {
    artifacts: '../frontend/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    forking: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
    }
  },
  typechain: {
    outDir: '../frontend/types/typechain',
  },
  namedAccounts: {
    deployer: 0
  },
};

export default config;
