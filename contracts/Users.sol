// contracts/Issue.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users {
    mapping(string => address) public addresses;
    mapping(address => string) public users;
    address walletCheck;

    function addUser(string memory name, address add) public {
        require(msg.sender == walletCheck, "Only walletCheck can add users");
        addresses[name] = add;
        users[add] = name;
    }

    function getUserAddress(string memory name) public view returns (address) {
        return addresses[name];
    }

    function getUsername(address add) public view returns (string memory) {
        return users[add];
    }

    function setWalletCheck(address _walletCheck) public {
        walletCheck = _walletCheck;
    }

    function getWalletCheck() public view returns (address) {
        return walletCheck;
    }
}
