// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Hours is ERC20, Ownable {

    address contractOwner;

    constructor() ERC20("Hours", "HRS") {
        contractOwner = msg.sender; //The address that deploys the contract is the owner
        _mint(msg.sender, 100000000000000 * 10 ** 18); //Will send to the owner address the minted tokens
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
}