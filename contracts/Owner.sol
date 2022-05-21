// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Owner {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Access Denied, only owner can access this resource");
        _;
    }

    function changeOwner() external onlyOwner() {
        owner = msg.sender;
    }
}