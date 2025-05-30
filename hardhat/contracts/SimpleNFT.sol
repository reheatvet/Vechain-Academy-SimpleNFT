// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721, Ownable {
    string public baseURI = "";
    uint256 public maxSupply = 333;
    uint256 public nextTokenId = 1;

    constructor() ERC721("Simple NFT", "SNFT") Ownable(msg.sender) {}

    function mint() public {
        require(nextTokenId <= maxSupply, "Max supply reached");
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}