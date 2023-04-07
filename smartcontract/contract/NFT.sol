pragma solidity 0.8.0;
 
import "./nf_token_metadata.sol";
import "./_ownable.sol";
 
contract NFT is NFTokenMetadata, Ownable {

  uint256 private currentTokenId;
 
  constructor(string memory _nftName, string memory _nftSymbol) {
    nftName = _nftName;
    nftSymbol = _nftSymbol;
    currentTokenId = 0;
  }
  
  function mint(address _to, string calldata _uri) external onlyOwner {
    currentTokenId = currentTokenId + 1;
    uint256 newTokenId = currentTokenId;
    super._mint(_to, newTokenId);
    super._setTokenUri(newTokenId, _uri);
  }


 
}