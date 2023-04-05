// deployNFT.js
import Web3 from "web3";
import NFTContract from "@/assets/NFT.json";

let web3;

// Vérifiez si MetaMask est installé
if (typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
} else {
  console.error("MetaMask n'est pas installé.");
}

const abi = NFTContract.abi;
const bytecode = NFTContract.bytecode;

const contract = new web3.eth.Contract(abi);

const deploy = async (nftName, nftSymbol) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0]; // Utilise le compte actuellement connecté à MetaMask

  if (!account) {
    throw new Error("Aucun compte Ethereum connecté.");
  }

  const gasPrice = await web3.eth.getGasPrice();
  const gasEstimate = await contract.deploy({
    data: bytecode,
    arguments: [nftName, nftSymbol],
  }).estimateGas({ from: account });

  const receipt = await contract.deploy({
    data: bytecode,
    arguments: [nftName, nftSymbol],
  }).send({
    from: account,
    gas: gasEstimate,
    gasPrice: gasPrice,
  });

  return receipt;
};

export default deploy
