// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Hardhat {

    address payable public walletAddress;
    uint256 public balance;

    event ShowAddress(address walletAddress);
    event TopUp(uint256 topUpValue, uint256 newBalance);
    event CashOut(uint256 cashOutValue, uint256 newBalance);
    event AddressVerified(address indexed addr, bool isValid);
    event Burn(uint256 burnValue, uint256 newBalance);

    constructor(uint256 initialValue) {
        balance = initialValue;
        walletAddress = payable(msg.sender);
    }

    mapping(address => uint256) private balances;

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function displayAddress() public {
        emit ShowAddress(walletAddress);
    }

    function topUp(uint256 topUpValue) public payable {
        require(topUpValue > 0, "Top-up value must be greater than 0");
        balance += topUpValue;
        emit TopUp(topUpValue, balance);
    }

    function cashOut(uint256 cashOutValue) public {
        require(balance >= cashOutValue, "Insufficient balance");
        balance -= cashOutValue;
        emit CashOut(cashOutValue, balance);
    }

    function burn(uint256 burnValue) public {
        require(msg.sender == walletAddress, "Only the owner can burn tokens");
        require(burnValue <= balance, "Burn value exceeds the contract balance");
        balance -= burnValue;
        emit Burn(burnValue, balance);
    }
   
    function verifyAddress(address addrToVerify) public pure returns (bool) {
        return addrToVerify != address(0); // Use a simplified condition
    }
}


   
