var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getCharacter",
		"outputs": [
			{
				"name": "_health",
				"type": "uint256"
			},
			{
				"name": "_attack",
				"type": "uint256"
			},
			{
				"name": "_strength",
				"type": "uint256"
			},
			{
				"name": "_defence",
				"type": "uint256"
			},
			{
				"name": "_unassignedPoints",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "createCharacter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_health",
				"type": "uint256"
			},
			{
				"name": "_attack",
				"type": "uint256"
			},
			{
				"name": "_strength",
				"type": "uint256"
			},
			{
				"name": "_defence",
				"type": "uint256"
			},
			{
				"name": "_unassignedPoints",
				"type": "uint256"
			}
		],
		"name": "updateCharacter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

module.exports.abi = abi;