const settings = require('./settings.js')
var Web3 = require('web3');


var web3;

// Get the web3 provider - Metamask automatically provides it
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}
//Set default account
web3.eth.defaultAccount = web3.eth.accounts[1];

//var abi = [ { "constant": true, "inputs": [], "name": "getCharacter", "outputs": [ { "name": "_health", "type": "uint256" }, { "name": "_attack", "type": "uint256" }, { "name": "_strength", "type": "uint256" }, { "name": "_defence", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "createCharacter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
var contractAddress = '0xf6e8c1bc0de477cbd053eaf9cb8be92f63b8fd03'

var ethereumContract = web3.eth.contract(settings.abi);
var contract = ethereumContract.at(contractAddress);


var createCharacter = () => {
        contract.createCharacter({gas:300000}, (err, res) => {
        if(err){
            //console.log('CreateCharacter: ', err)
            return;
        }else{
            console.log('Created new character')
            return res;
        }
    });
}

var getCharacter = (callback) => {
        contract.getCharacter((err, res) => {
        if(err){
            //console.log('getCharacter: ', err)
            callback(err)
        }else{
            //console.log('getCharacter: ', res)
            callback(undefined, res)
        }
    });
}

var updateCharacter = (data) => {
    contract.updateCharacter(data['health-value'],
                             data['attack-value'],
                             data['strength-value'],
                             data['defence-value'],
                             data['unassigned-points'], {gas:300000}, (err, res) => {
    if(err){
        console.log('updateCharacter: ', err)
    }else{
        console.log('updateCharacter', res)
    }
});
}

module.exports.createCharacter = createCharacter;
module.exports.getCharacter = getCharacter;
module.exports.updateCharacter = updateCharacter;