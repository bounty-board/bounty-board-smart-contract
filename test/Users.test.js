const { expect } = require('chai');

const Users = artifacts.require('Users');

contract('Users', function ([owner, other]) {
  beforeEach(async function () {
    this.users = await Users.new({ from: owner });
  });

  it('Sanity test', async function () {
    expect(true).to.equal(true);
  });

  it('Can add user', async function () {
    for (var i = 0; i < 1000; i++) {
      let r = (Math.random() + 1).toString(36).substring(7);
      await this.users.addUser(r, { from: owner });

      let addReturned = await this.users.getUser(r);
      expect(addReturned).to.equal(owner);
    }
  });
});
