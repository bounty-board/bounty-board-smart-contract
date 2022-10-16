require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-truffle5');

const { alchemyApiKey, mnemonic } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
  },
};
