const { expect } = require('chai');

const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Project = artifacts.require('Project');
const Issue = artifacts.require('Issue');

contract('Project', function ([owner, other]) {
  beforeEach(async function () {
    this.project = await Project.new('neovim', 'neovim', { from: owner });
  });

  it('Sanity test', async function () {
    expect(true).to.equal(true);
  });

  it('Has the correct name', async function () {
    expect(await this.project.getName()).to.equal('neovim');
  });

  it('Can add issue', async function () {
    await this.project.createIssue(new BN('123'), { from: owner });

    let addReturned = await this.project.getIssue(new BN('123'));
    let issue = await Issue.at(addReturned);

    expect(await issue.getId()).to.be.bignumber.equal(new BN('123'));
  });

  it('Can add multiple issues', async function () {
    await this.project.createIssue('123', { from: owner });
    await this.project.createIssue('456', { from: owner });

    let addReturned = await this.project.getIssue(new BN('123'));
    let issue = await Issue.at(addReturned);

    expect(await issue.getId()).to.be.bignumber.equal(new BN('123'));

    addReturned = await this.project.getIssue(new BN('456'));
    issue = await Issue.at(addReturned);

    expect(await issue.getId()).to.be.bignumber.equal(new BN('456'));
  });

  it('Can add multiple issues with different owners', async function () {
    await this.project.createIssue('123', { from: owner });
    await this.project.createIssue('456', { from: other });

    let addReturned = await this.project.getIssue(new BN('123'));
    let issue = await Issue.at(addReturned);

    expect(await issue.getId()).to.be.bignumber.equal(new BN('123'));

    addReturned = await this.project.getIssue(new BN('456'));
    issue = await Issue.at(addReturned);

    expect(await issue.getId()).to.be.bignumber.equal(new BN('456'));
  });
});
