const { expect } = require('chai');

const Users = artifacts.require('Users');

contract('Users', function ([owner, other]) {
  beforeEach(async function () {
    this.users = await Users.new({ from: owner });
  });

  it('Sanity test', async function () {
    expect(true).to.equal(true);
  });
});
