# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat compile

// Start local blockchain
npx hardhat node

// Deploy locally
npx hardhat run --network localhost scripts/deploy.js

// Deploy on testate
npx hardhat run --network goerli scripts/deploy.js

// Interact
npx hardhat console --network localhost
npx hardhat console --network goerli

const Issue = await ethers.getContractFactory('Issue')
const issue = await Issue.attach('<issue address>')
await issue.addBounty(100, {value: 100})

// Test
npx hardhat test
REPORT_GAS=true npx hardhat test

// Run local chainlink node
Follow this video https://www.youtube.com/watch?v=ZB3GLtQvgME&t=14s

In .env file in chainlink, make sure LINK_CONTRACT_ADDRESS matches deployed contract address
```
