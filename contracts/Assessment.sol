// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    int result;

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

     function addNum(int num1, int num2) external {
        result = num1 + num2;
    }

    function subtractNum(int num1, int num2) external {
        result = num1 - num2;
    }

    function multiplyNum(int num1, int num2) external {
        result = num1 * num2;
    }

    function Result() external view returns (int) {
        return result;
    }
}
