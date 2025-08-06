// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract LinkShield {

    struct Link {
        string url;
        address owner;
        uint256 fee;


    }

    function addLink (string calldata url, string calldata linkId, uint256 fee) public {

        Link memory link = links[linkId];
        require( link.owner == address (0) || link.owner == msg.sender, "This linkId already has an owner!!");

        link.url = url;
        link.owner = msg.sender;
        link.fee = fee;
    }


}