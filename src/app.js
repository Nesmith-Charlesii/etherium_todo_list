// This is how the app will talk to the blockchain

App = {
    load: async () => {
        await App.loadWeb3()
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})