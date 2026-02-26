const NFT = artifacts.require("NFT");

contract("NFT", (accounts) => {
  it("deploys with the expected name and symbol", async () => {
    const nft = await NFT.new("CryptoCactus", "CCACT");

    const name = await nft.name();
    const symbol = await nft.symbol();

    assert.equal(name, "CryptoCactus");
    assert.equal(symbol, "CCACT");
  });

  it("mints a token and stores metadata URI", async () => {
    const owner = accounts[0];
    const recipient = accounts[1];
    const tokenUri = "https://example.test/metadata/1";

    const nft = await NFT.new("CryptoCactus", "CCACT", { from: owner });
    await nft.mint(recipient, tokenUri, { from: owner });

    const tokenOwner = await nft.ownerOf(1);
    const storedTokenUri = await nft.tokenURI(1);

    assert.equal(tokenOwner, recipient);
    assert.equal(storedTokenUri, tokenUri);
  });

  it("rejects minting from non-owner account", async () => {
    const owner = accounts[0];
    const nonOwner = accounts[2];

    const nft = await NFT.new("CryptoCactus", "CCACT", { from: owner });

    let reverted = false;
    try {
      await nft.mint(nonOwner, "https://example.test/metadata/2", { from: nonOwner });
    } catch (error) {
      reverted = error.message.includes("revert");
    }

    assert.equal(reverted, true, "Expected mint to revert for non-owner");
  });
});
