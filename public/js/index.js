
var socket = io();
var characterStats;
var maxSpendablePoints;


socket.on('connect', function (data) {
    console.log('Connected to server.');
  });

jQuery('#createCharacter').on('click', function (event) {
    event.preventDefault();
    socket.emit('create-character', {
      //Send address here
      address:'0x00000000000000000000'
    }, function (response) {
      characterStats = response;
      maxSpendablePoints = response['unassigned-points']

      //Render stats
      var template = jQuery('#stats').html();
      var html = Mustache.render(template, response);
      jQuery('#stats-list-container').replaceWith(html)
    })
});

jQuery('#saveCharacter').on('click', function (event) {
  //Client side validation
  if(characterStats == undefined){
    console.log("no character is loaded")
  }else if (characterStats['unassigned-points'] > 0){
    console.log("you have unspent points")
  }else{
    socket.emit('save-character', characterStats, function (response) {
    })
  }

});


jQuery(document).on('click','#health-plus', function (event) {
  if(characterStats['unassigned-points'] > 0){
    characterStats['unassigned-points'] --;
    characterStats["health-value"]++;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});

jQuery(document).on('click','#health-minus', function (event) {
  if(characterStats['unassigned-points'] < maxSpendablePoints){
    characterStats['unassigned-points'] ++;
    characterStats["health-value"]--;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});

jQuery(document).on('click','#attack-plus', function (event) {
  if(characterStats['unassigned-points'] > 0){
    characterStats['unassigned-points'] --;
    characterStats["attack-value"]++;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});

jQuery(document).on('click','#attack-minus', function (event) {
  if(characterStats['unassigned-points'] < maxSpendablePoints){
    characterStats['unassigned-points'] ++;
    characterStats["attack-value"]--;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});

jQuery(document).on('click','#strength-plus', function (event) {
  if(characterStats['unassigned-points'] > 0){
    characterStats['unassigned-points'] --;
    characterStats["strength-value"]++;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});

jQuery(document).on('click','#strength-minus', function (event) {
  if(characterStats['unassigned-points'] < maxSpendablePoints){
    characterStats['unassigned-points'] ++;
    characterStats["strength-value"]--;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});

jQuery(document).on('click','#defence-plus', function (event) {
  if(characterStats['unassigned-points'] > 0){
    characterStats['unassigned-points'] --;
    characterStats["defence-value"]++;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});

jQuery(document).on('click','#defence-minus', function (event) {
  if(characterStats['unassigned-points'] < maxSpendablePoints){
    characterStats['unassigned-points'] ++;
    characterStats["defence-value"]--;
    var template = jQuery('#stats').html();
    var html = Mustache.render(template,characterStats);
    jQuery('#stats-list-container').replaceWith(html)
  }
});
