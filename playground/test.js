var Web3 = require('web3');

var web3;

//==================== SMART CONTRACT ====================//
// Get the web3 provider - Metamask automatically provides it
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}
//Set default account
web3.eth.defaultAccount = web3.eth.accounts[0];

var abi = [ { "constant": true, "inputs": [], "name": "getCharacter", "outputs": [ { "name": "_health", "type": "uint256" }, { "name": "_attack", "type": "uint256" }, { "name": "_strength", "type": "uint256" }, { "name": "_defence", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "createCharacter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
var contractAddress = '0xd35ee5866d5bb550277aa927d4fcc452499dee0c'

var ethereumContract = web3.eth.contract(abi);
var contract = ethereumContract.at(contractAddress);


var createCharacter = contract.createCharacter({gas:300000}, (err, res) => {
    if(err){
        console.log('CreateCharacter: ', err)
    }else{
        console.log('CreateCharacter :', res)
    }
});

var getCharacter = contract.getCharacter((err, res) => {
    if(err){
        console.log('getCharacter: ', err)
    }else{
        console.log('getCharacter: ', res)
    }
});






// var createCharacter = contract.createCharacter();


// var getCharacter = contract.getCharacter( (err, res) => {
//     if(err){

//     }else{
//         return{
//             'health-value': 11,
//             'attack-value': 1,
//             'strength-value': 1,
//             'defence-value': 1,
//         }
//     }
// })

// createCharacter

// exports.createCharacter = createCharacter;
// exports.getCharacter = getCharacter;