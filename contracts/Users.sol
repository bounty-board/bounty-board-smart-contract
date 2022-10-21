// contracts/Issue.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users {
    mapping(string => address) public users;

    function addUser(string memory name) public {
        users[name] = msg.sender;
    }

    function getUser(string memory name) public view returns (address) {
        return users[name];
    }
}
