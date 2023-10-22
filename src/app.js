// This is how the app will talk to the blockchain
// metamask is used to connect the browser to the blockchain
// metamask communicates to the etherium blockchain with web3.js

App = {
    contracts: {},

    load: async () => {
        // loading the web3 library will connect the app to the blockchain
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } catch (error) {
            // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
  },

  loadAccount: async () => {
    App.account = web3.eth.accounts[0]
    console.log(App.account)
  },

  // This creates a truffle contract - a javascript representation of a smart contract 
  loadContract: async () => {
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(window.web3)

    // Upddate the smart contract with values from the blockchain
    App.todoList = await App.contracts.TodoList.deployed
  },

  render: async () => {
    $("#account").html(App.account)
  }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})