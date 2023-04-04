module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545, // Port de votre client local Ethereum, par exemple Ganache
        network_id: "*" // Correspond à n'importe quel network_id
      },
    },
    compilers: {
      solc: {
        version: "0.8.0", // Version du compilateur Solidity
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  };
  