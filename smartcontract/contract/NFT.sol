pragma solidity 0.8.0;
 
import "./nf_token_metadata.sol";
import "./_ownable.sol";
 
contract NFT is NFTokenMetadata, Ownable {
 
  constructor(string memory _nftName, string memory _nftSymbol) {
    nftName = _nftName;
    nftSymbol = _nftSymbol;
  }
  
  function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
    super._mint(_to, _tokenId);
    super._setTokenUri(_tokenId, _uri);
  }

 
}