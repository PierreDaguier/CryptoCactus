// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./nf_token.sol";
import "./erc_721-metadata.sol";


contract NFTokenMetadata is
  NFToken,
  ERC721Metadata
{


  string internal nftName;


  string internal nftSymbol;


  mapping (uint256 => string) internal idToUri;


  constructor()
  {
    supportedInterfaces[0x5b5e139f] = true; 
  }


  function name()
    external
    override
    view
    returns (string memory _name)
  {
    _name = nftName;
  }


  function symbol()
    external
    override
    view
    returns (string memory _symbol)
  {
    _symbol = nftSymbol;
  }


  function tokenURI(
    uint256 _tokenId
  )
    external
    override
    view
    validNFToken(_tokenId)
    returns (string memory)
  {
    return _tokenURI(_tokenId);
  }


  function _tokenURI(
    uint256 _tokenId
  )
    internal
    virtual
    view
    returns (string memory)
  {
    return idToUri[_tokenId];
  }


  function _burn(
    uint256 _tokenId
  )
    internal
    override
    virtual
  {
    super._burn(_tokenId);

    delete idToUri[_tokenId];
  }


  function _setTokenUri(
    uint256 _tokenId,
    string memory _uri
  )
    internal
    validNFToken(_tokenId)
  {
    idToUri[_tokenId] = _uri;
  }

}
