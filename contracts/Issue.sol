// contracts/Issue.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Issue {
    mapping(address => uint) public _bounties;
    uint public _totalBounties;
    uint public _id;

    constructor(uint id)  {
        _id = id;
    }

    function addBounty(uint256 amount) payable public {
        require(msg.value == amount);
        _bounties[msg.sender] += amount;
        _totalBounties += amount;
    }

    function getBounty () public view returns (uint) {
        return address(this).balance;
    }

    function getAddressBounty (address add) public view returns (uint) {
        return _bounties[add];
    }

    function getId () public view returns (uint) {
        return _id;
    }
}
