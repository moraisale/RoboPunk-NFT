// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

// contract we can use for mint 
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
// define functions that only the owner can use
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunksNFT is ERC721, Ownable {
  // storage variables
  uint256 public mintPrice;
  uint256 public totalSupply;
  uint256 public maxSupply;
  uint256 public maxPerWallet;
  bool public isPublicMintEnabled; // when he able to mint
  string internal baseTokenUri; // where the images are located
  address payable public withdrawWallet;
  mapping(address => uint256) public walletMints; // track how many mints each wallet do

  // run when the contract ddeploy, name and symbol for argument
  constructor() payable ERC721('RoboPunks', 'RP') {
    mintPrice = 0.02 ether; 
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 3;
  }

  function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
    isPublicMintEnabled = isPublicMintEnabled_;

  }

  // uri that contains the image
  function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
    baseTokenUri = baseTokenUri_;
  }

  function tokenURI(uint256 tokenId_) public view override returns (string memory) {
    require(_exists(tokenId_), 'Token does not exist!');
    return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
  }

  function withdraw() external onlyOwner {
    (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
    require(success, "Withdraw failed");
  }
 
  function mint(uint256 quantity_) public payable {
    require(isPublicMintEnabled, 'Minting not enabled');
    require(msg.value == quantity_ * mintPrice, 'Wrong mint value');
    require(totalSupply + quantity_ <= maxSupply, 'Sold out');
    require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'Exceed max wallet');

    for (uint256 i = 0; i < quantity_; i++) {
      uint256 newTokenId = totalSupply + 1;
      totalSupply++;
      _safeMint(msg.sender, newTokenId);
    }
  }

}