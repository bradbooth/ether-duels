//testrpc -m "city awake rib typical join adapt habit key bounce lab direct pilot"

App = {
  web3Provider: null,
  contracts: {},
  characterStats: null,
  startingStats: null,

  init: function() {
    console.log('Starting')    

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to testrpc
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('etherduel.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var etherduelArtifact = data;
      App.contracts.etherduel = TruffleContract(etherduelArtifact);
    
      // Set the provider for our contract
      App.contracts.etherduel.setProvider(App.web3Provider);
    
      // Use our contract to retrieve information from the contract
      // todo?
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#create-button', App.createCharacter);
    $(document).on('click', '#save-button', App.updateCharacter);
    $(document).on('click', '#load-button', App.loadCharacter);
    $(document).on('click', '#duel-button', App.duel);

    $(document).on('click', '#health-plus', statbuttons.health_plus);
    $(document).on('click', '#health-minus', statbuttons.health_minus);
    $(document).on('click', '#attack-plus', statbuttons.attack_plus);
    $(document).on('click', '#attack-minus', statbuttons.attack_minus);
    $(document).on('click', '#strength-plus', statbuttons.strength_plus);
    $(document).on('click', '#strength-minus', statbuttons.strength_minus);
    $(document).on('click', '#defence-plus', statbuttons.defence_plus);
    $(document).on('click', '#defence-minus', statbuttons.defence_minus);

  },

  getCharacter: function(){
    var contractInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.etherduel.deployed().then(function(instance) {
        contractInstance = instance;
        return contractInstance.getCharacter.call();
      }).then(function(result) {
        console.log('getCharacter: ', result);
        return result;
      }).catch(function(err) {
        console.log('getCharacter: ',err.message);
      });
    }); 
  },

  createCharacter: function(){
    event.preventDefault();
    var contractInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.etherduel.deployed().then(function(instance) {
        contractInstance = instance;
        // Execute adopt as a transaction by sending account
        return contractInstance.createCharacter();
      }).then(function(result) {
        console.log('createCharacter: ', result);
        return contractInstance.getCharacter();
      }).then(function(result) {
        console.log('getCharacter: ', result);
        App.assignStats(result);
      }).then(function(result) {
        App.renderStats(result);
      }).catch(function(err) {
        console.log(err.message);
      });
    }); 
  },

  //uint _health, uint _attack, uint _strength, uint _defence, uint _unassignedPoints
  updateCharacter: function(){
    console.log(characterStats)
    var contractInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.etherduel.deployed().then(function(instance) {
        contractInstance = instance;
        return contractInstance.updateCharacter(characterStats['health-value'],
                                                characterStats['attack-value'],
                                                characterStats['strength-value'],
                                                characterStats['defence-value'],
                                                characterStats['unassigned-points'],);
      }).then(function(result) {
        console.log('updateCharacter: ', result);
        return result;
      }).catch(function(err) {
        console.log('updateCharacter: ',err.message);
      });
    }); 
  },

  loadCharacter: function(){
    var contractInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.etherduel.deployed().then(function(instance) {
        contractInstance = instance;
        return contractInstance.getCharacter()
      }).then(function(result) {
        console.log('getCharacter: ', result);
        App.assignStats(result);
      }).then(function(result) {
        App.renderStats(result);
      }).catch(function(err) {
        console.log(err.message);
      });
    }); 
  },

  duel: function(){
    var contractInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.etherduel.deployed().then(function(instance) {
        contractInstance = instance;
        return contractInstance.enterDuelQueue()
      }).then(function(result) {
        console.log('Duel: ', result);
      }).catch(function(err) {
        console.log(err.message);
      });
    }); 
  },

  assignStats: function(stats){
    characterStats = {
      'level'            : stats[0].c[0],
      'health-value'     : stats[1].c[0],
      'attack-value'     : stats[2].c[0],
      'strength-value'   : stats[3].c[0],
      'defence-value'    : stats[4].c[0],
      'unassigned-points': stats[5].c[0],
      'helmet-id'        : stats[6].c[0],
      'body-id'          : stats[7].c[0],
      'legs-id'          : stats[8].c[0],
      'hash-id'          : stats[9].c[0]
    }
    startingStats = Object.assign({}, characterStats);
  },

  renderStats: function(stats){
      //Render stats
      var template = $('#stats').html();
      var html = Mustache.render(template, characterStats);
      $('#stat-value-container').replaceWith(html)
      //Render Points
      var template = $('#points-remaining').html();
      var html = Mustache.render(template, characterStats);
      $('#points-remain').replaceWith(html)
      console.log(characterStats['hash-id'])
      loadCharacter(characterStats['helmet-id'], characterStats['body-id'],characterStats['legs-id'],)
  },

};





$(function() {
  $(window).load(function() {
    App.init();
  });
});
