// contracts/Project.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Issue.sol';

contract Project {
    mapping(uint => address) public issues;
    string public name;
    string public owner;

    event IssueAdded(uint id, address issuer);

    constructor(string memory _name, string memory _owner)  {
        name = _name;
        owner = _owner;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getOwner() public view returns (string memory) {
        return owner;
    }

    function createIssue(uint id) public returns (address) {
        Issue issue = new Issue(id);
        address issueAddress = address(issue);
        issues[id] = issueAddress;
        emit IssueAdded(id, issueAddress);
        return issueAddress;
    }

    function getIssue(uint id) public view returns (address) {
        return issues[id];
    }
}
