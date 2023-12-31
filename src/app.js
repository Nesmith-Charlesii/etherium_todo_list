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
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
          } else {
            window.alert("Please connect to Metamask.")
          }
        // Modern dapp browsers...
        if (window.ethereum) {
            console.log(window.ethereum.isConnected())
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
        try {
            const todoList = await $.getJSON('TodoList.json')
            App.contracts.TodoList = TruffleContract(todoList)
            console.log(App.contracts.TodoList)
            App.contracts.TodoList.setProvider(window.web3)
            
            // Upddate the smart contract with values from the blockchain
            App.todoList = await App.contracts.TodoList.deployed
            console.log('Contract Loaded: ',App.todoList.address)
        } catch(error) {
            console.log('Error loading contract: ',error)
        }
    },

    render: async () => {
        // Prevent rendering twice
        if(App.loading) {
            return
        }
        
        App.setLoading(true)

        // Render the Account
        $("#account").html(App.account)

        await App.renderTasks()

        // Update loading state
        App.setLoading(false)
        
    },

  
    renderTasks: async () => {
        const taskCount = await App.todoList.taskCount
        const $taskTemplate = $('.taskTemplate')
        console.log("task count", taskCount)
        for(let i = 1; i <= taskCount; i++) {
            const task = await App.todoList.tasks(i)
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]

            // Create the html for the task
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
                // .on('click', App.toggleCompleted)

            if(taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }
            
            $newTaskTemplate.show()
        }
    },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')

        if(boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    },


}

$(() => {
    $(window).load(() => {
        App.load()
    })
})