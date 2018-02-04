const path = require('path');
const http = require('http')
const hbs = require('hbs')
const express = require('express');
const socketIO = require('socket.io')
const web3 = require('web3');

const etherduel = require(__dirname + '/contract/smartcontract.js')

const path_public = path.join(__dirname + '/../public'); //Build a nice looking path
const PORT = process.env.PORT || 3000;

var app = express(); //Initialize express
var server = http.createServer(app); 
var io = socketIO(server);

app.use(express.static(__dirname + '/public'));

//Create a blank character
var character = {
    'health-value': 10,
    'attack-value': 1,
    'strength-value': 1,
    'defence-value': 1,
    'name':'Brad'
}


 
app.use(express.static(path_public));
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('New user connected');
  
    //Create character from smart contract
    socket.on('create-character', (data, callback) => {
        etherduel.createCharacter();
        //Load character details
        etherduel.getCharacter( (err, res) => {
            if(err){
                console.log('characterStats: ', err)
            }else{
                console.log('characterStats: ', res)
                //Return character details
                callback({
                    'health-value'    : res[0],
                    'attack-value'    : res[1],
                    'strength-value'  : res[2],
                    'defence-value'   : res[3],
                    'unassigned-points': res[4]
                });
            }
        });
    });

    //Create character from smart contract
    socket.on('save-character', (data, callback) => {
        console.log("Save character");
        //Validate
        etherduel.getCharacter( (err, res) => {
            if(err){
                console.log('Error retrieving stats: ', err)
            }else{
                allowedSum = parseInt(res[0])  
                           + parseInt(res[1])
                           + parseInt(res[2])
                           + parseInt(res[3])
                           + parseInt(res[4])

                givenSum = parseInt(data['health-value'])
                         + parseInt(data['attack-value'])
                         + parseInt(data['strength-value'])
                         + parseInt(data['defence-value'])
                         + parseInt(data['unassigned-points'])

                //Verify theyre the same
                if (allowedSum != givenSum){
                    return;
                }else{
                    //If the same, then update
                    etherduel.updateCharacter(data);
                    etherduel.getCharacter( (err, res) => {
                        if(err){
                            console.log('characterStats: ', err)
                        }else{
                            console.log('characterStats: ', res)
                            //Return character details
                            callback({
                                'health-value'    : res[0],
                                'attack-value'    : res[1],
                                'strength-value'  : res[2],
                                'defence-value'   : res[3],
                                'unassigned-points': res[4]
                            });
                        }
                    });
                }
            }
        });


    });


    


    socket.on('disconnect', () => {
      console.log('Client disconnected.')
    })
});