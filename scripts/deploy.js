async function main() {
  // We get the contract to deploy
  const Project = await ethers.getContractFactory('Project');
  console.log('Deploying Project...');
  const project = await Project.deploy(
    'bountyboardsmartcontract',
    'bounty-board'
  );
  await project.deployed();
  console.log('Project deployed to:', project.address);

  console.log('Deploying Issue...');
  await project.createIssue('1410376581');
  let issueAddress = await project.getIssue('1410376581');
  console.log('Issue deployed to:', issueAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
