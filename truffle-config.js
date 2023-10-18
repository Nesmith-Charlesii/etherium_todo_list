// This is used in order to connect to the blockchain network locally
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      // This port is where ganache is running
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}