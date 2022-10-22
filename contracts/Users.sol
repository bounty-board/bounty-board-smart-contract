// contracts/Issue.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users {
    mapping(string => address) public users;
    address walletCheck;

    function addUser(string memory name, address add) public {
        require(msg.sender == walletCheck, "Only walletCheck can add users");
        users[name] = add;
    }

    function getUser(string memory name) public view returns (address) {
        return users[name];
    }

    function setWalletCheck(address _walletCheck) public {
        walletCheck = _walletCheck;
    }

    function getWalletCheck() public view returns (address) {
        return walletCheck;
    }
}
