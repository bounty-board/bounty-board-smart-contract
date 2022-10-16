async function main() {
  // We get the contract to deploy
  const Issue = await ethers.getContractFactory('Issue');
  console.log('Deploying Issue...');
  const issue = await Issue.deploy();
  await issue.deployed();
  console.log('Issue deployed to:', issue.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
