const Ganache = require("ganache");

let testProvider;

module.exports = {
  contracts_directory: "./contract",
  contracts_build_directory: "./build/contracts",
  test_directory: "./test",
  networks: {
    development: {
      host: process.env.DEVNET_HOST || "127.0.0.1",
      port: Number(process.env.DEVNET_PORT || 8545),
      network_id: process.env.DEVNET_ID || "*",
    },
    test: {
      provider: () => {
        if (!testProvider) {
          testProvider = Ganache.provider({
            chain: {
              chainId: 1337,
              networkId: 1337,
            },
            logging: {
              quiet: true,
            },
            wallet: {
              totalAccounts: 10,
              defaultBalance: 1000,
            },
          });
        }

        return testProvider;
      },
      network_id: 1337,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
