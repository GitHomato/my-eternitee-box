// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Hours.sol";


contract MissionValidator is Hours {

    
    function transferHRS(address volunteerAddress, uint256 amount) public payable onlyOwner {
        Hours hoursToken = Hours(0x1edCf1B64A240b0c967A6e21F7d6B1E59F54f3BF);
        hoursToken.transfer(volunteerAddress,amount);
    }
}

