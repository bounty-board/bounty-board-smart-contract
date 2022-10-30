const {
  VERIFICATION_BLOCK_CONFIRMATIONS,
  networkConfig,
  developmentChains,
} = require('../helper-hardhat-config');

const LINK_TOKEN_ABI = require('@chainlink/contracts/abi/v0.4/LinkToken.json');

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  // We get the contract to deploy
  const Project = await ethers.getContractFactory('Project');
  console.log('Deploying Project...');
  const project = await Project.connect(deployer).deploy(
    'bounty-board',
    'bounty-board'
  );
  await project.deployed();
  console.log('Project deployed to:', project.address);

  console.log('Deploying Issue...');
  await project.createIssue('1410376581');
  let issueAddress = await project.getIssue('1410376581');
  console.log('Issue deployed to:', issueAddress);

  let linkToken;
  let mockOracle;

  const chainId = await ethers.provider
    .getNetwork()
    .then((network) => network.chainId);
  console.log('chainId:', chainId);
  // Define the LINK token address for the current network.
  if (chainId === 1337) {
    const linkTokenFactory = await ethers.getContractFactory('LinkToken');
    linkToken = await linkTokenFactory.connect(deployer).deploy();
    console.log('LinkToken deployed to:', linkToken.address);

    const mockOracleFactory = await ethers.getContractFactory('MockOperator');
    mockOracle = await mockOracleFactory
      .connect(deployer)
      .deploy(linkToken.address, deployer.address);
    console.log('MockOracle deployed to:', mockOracle.address);

    linkTokenAddress = linkToken.address;
    oracleAddress = mockOracle.address;
  } else {
    oracleAddress = networkConfig[chainId]['oracle'];
    linkTokenAddress = networkConfig[chainId]['linkToken'];
    linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer);
  }

  // Get config vars
  const jobId = ethers.utils.toUtf8Bytes(networkConfig[chainId]['jobId']);
  const fee = networkConfig[chainId]['fee'];

  // Deploy Users
  const Users = await ethers.getContractFactory('Users');
  const users = await Users.deploy();

  console.log('Deploying Users...');
  await users.deployed();
  console.log('Users deployed to:', users.address);

  // Deploy WalletCheck
  console.log('Deploying WalletCheck...');
  const WalletCheckFactory = await ethers.getContractFactory('WalletCheck');
  const walletCheckFactory = await WalletCheckFactory.deploy(
    oracleAddress,
    jobId,
    fee,
    linkTokenAddress,
    users.address
  );

  // If the dev chain only need 1 confirmations, otherwise 6
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;
  await walletCheckFactory.deployTransaction.wait(waitBlockConfirmations);

  console.log(
    `WalletCheck deployed to ${walletCheckFactory.address} on ${network.name}`
  );

  // auto-funding
  const fundAmount = networkConfig[chainId]['fundAmount'];
  await linkToken.transfer(walletCheckFactory.address, fundAmount);

  console.log(`WalletCheck funded with ${fundAmount} JUELS`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
