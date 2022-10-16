const { expect } = require('chai');

const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Issue = artifacts.require('Issue');

contract('Issue', function ([owner, other]) {
  beforeEach(async function () {
    this.issue = await Issue.new(new BN('123'), { from: owner });
  });

  it('Sanity test', async function () {
    expect(true).to.equal(true);
  });

  it('Has the correct id', async function () {
    expect(await this.issue.getId()).to.be.bignumber.equal(new BN('123'));
  });

  it('Can add to bounty', async function () {
    await this.issue.addBounty(new BN('100'), { from: owner, value: 100 });

    // Check that the balance of the smart contract is 100
    expect(await this.issue.getBounty()).to.be.bignumber.equal('100');

    // Check that the balance of the owner is 100
    expect(await this.issue.getAddressBounty(owner)).to.be.bignumber.equal(
      '100'
    );
  });

  it("Other does not have balance if didn't add any", async function () {
    await this.issue.addBounty(new BN('100'), { from: owner, value: 100 });

    // Check that the balance of the smart contract is 100
    expect(await this.issue.getBounty()).to.be.bignumber.equal('100');

    // Check that the balance of the other is 0
    expect(await this.issue.getAddressBounty(other)).to.be.bignumber.equal('0');
  });

  it('Can add to bounty multiple times', async function () {
    await this.issue.addBounty(new BN('100'), { from: owner, value: 100 });
    await this.issue.addBounty(new BN('100'), { from: other, value: 100 });

    // Check that the balance of the smart contract is 200
    expect(await this.issue.getBounty()).to.be.bignumber.equal('200');

    // Check that the balance of the owner is 200
    expect(await this.issue.getAddressBounty(owner)).to.be.bignumber.equal(
      '100'
    );
  });

  it('Can add to bounty multiple times with different amounts', async function () {
    await this.issue.addBounty(new BN('100'), { from: owner, value: 100 });
    await this.issue.addBounty(new BN('200'), { from: other, value: 200 });

    // Check that the balance of the smart contract is 300
    expect(await this.issue.getBounty()).to.be.bignumber.equal('300');

    // Check that the balance of the owner is 100
    expect(await this.issue.getAddressBounty(owner)).to.be.bignumber.equal(
      '100'
    );
  });
});
