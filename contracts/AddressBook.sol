// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddressBook {

    // map an address to an address list
    mapping(address => address[]) private addresses;

    // map an address to a map of address that return an alias
    mapping(address => mapping(address => string)) private aliases;

    // return a list of addresses in the with an address key
    function getAddressList(address _addr) public view returns(address[] memory) {
        return addresses[_addr];
    }

    // helper function to convert string to bytes32, so we can do comparisons
    function bytesString(string memory _string) internal pure returns(bytes32) {
        return keccak256(abi.encodePacked(_string));
    }

    // add a new address with an alias
    function addAddress(address _addr, string memory _alias) public {
        require(bytesString(_alias) != bytesString(""),"Alias cannot be blank");
        require(
            bytesString(aliases[msg.sender][_addr]) == bytesString(""), 
            "Address already registered" 
        );
        addresses[msg.sender].push(_addr);
        aliases[msg.sender][_addr] = _alias;
    }

    // remove an address
    function removeAddress(address _addr) public {
        uint length = addresses[msg.sender].length;
        require(length > 0, "This account does not have any address");
        for(uint i = 0; i< length; i++){
            // find the address in the list
            if(_addr == addresses[msg.sender][i]) {
                // shift each item down 1
                // make sure the length of list is > 1
                if(addresses[msg.sender].length > 1 && i < length-1) {
                    // place the last item of the array in the position used by the
                    // item we are going to remove
                    addresses[msg.sender][i] = addresses[msg.sender][length-1];
                }

                // delete the last item of the array
                delete addresses[msg.sender][length-1];
                // delete the alias
                delete aliases[msg.sender][_addr];

                break;
            }

        }

    }

    // get the alias for your address
    function getAlias(address _ownerAddress, address _addr) public view returns(string memory){
        return aliases[_ownerAddress][_addr];
    }

}