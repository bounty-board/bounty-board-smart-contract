const {
  VERIFICATION_BLOCK_CONFIRMATIONS,
  networkConfig,
  developmentChains,
} = require('../helper-hardhat-config');

const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

const { expect } = require('chai');

contract('WalletCheck', function ([owner, other]) {
  async function deployWalletCheckFixture() {
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const chainId = await ethers.provider
      .getNetwork()
      .then((network) => network.chainId);

    const linkTokenFactory = await ethers.getContractFactory('LinkToken');
    linkToken = await linkTokenFactory.connect(deployer).deploy();
    // console.log('LinkToken deployed to:', linkToken.address);

    const mockOracleFactory = await ethers.getContractFactory('MockOracle');
    mockOracle = await mockOracleFactory
      .connect(deployer)
      .deploy(linkToken.address);
    // console.log('MockOracle deployed to:', mockOracle.address);

    linkTokenAddress = linkToken.address;
    oracleAddress = mockOracle.address;

    const jobId = ethers.utils.toUtf8Bytes(networkConfig[chainId]['jobId']);
    const fee = networkConfig[chainId]['fee'];

    // console.log('Deploying WalletCheck...');

    const WalletCheck = await ethers.getContractFactory('WalletCheck');
    const walletCheck = await WalletCheck.deploy(
      oracleAddress,
      jobId,
      fee,
      linkTokenAddress
    );

    await walletCheck.deployed();
    // console.log('WalletCheck deployed to:', this.walletCheck.address);

    const Users = await ethers.getContractFactory('Users');
    const users = await Users.deploy();
    await users.deployed();

    await users.setWalletCheck(walletCheck.address);

    const fundAmount =
      networkConfig[chainId]['fundAmount'] || '1000000000000000000';
    await linkToken.connect(deployer).transfer(walletCheck.address, fundAmount);

    return { walletCheck, linkToken, mockOracle, users };
  }

  it('Sanity test', async function () {
    expect(true).to.equal(true);
  });

  it('Set wallet check address correctly', async function () {
    const { users, walletCheck } = await loadFixture(deployWalletCheckFixture);
    const walletCheckAddress = await users.getWalletCheck();

    expect(walletCheckAddress).to.equal(walletCheck.address);
  });

  it('Makes an API request', async function () {
    const { walletCheck } = await loadFixture(deployWalletCheckFixture);
    let transaction = await walletCheck.requestWalletAddress('bryt12');

    const transactionReceipt = await transaction.wait(1);
    const requestId = transactionReceipt.events[0].topics[1];
    expect(requestId).to.not.be.null;
  });
});
