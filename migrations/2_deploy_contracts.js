// Updates the state of the blockchain
// Blockchain is essentially like one big database. This is a migration similar to updating tables in a dB
// Migrations are numbered so that Truffle knows which order to run them

// Truffle artifacts are an abstraction of the todolist that it understands in order to add it to the blockchain
const TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};
