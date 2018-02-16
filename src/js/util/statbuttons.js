
function validate_plus(){
  //You can only increment if you have points left to assign
  if(characterStats != undefined && characterStats['unassigned-points'] > 0){
    return true;
  }
}

function validate_minus(stat){
  //Stats cant go lower than when they started
  if(characterStats != null && characterStats[stat] > startingStats[stat]){
    return true;
  }
}

statbuttons = {
  health_plus: function(){
    if(validate_plus()){
      characterStats['unassigned-points'] --;
      characterStats["health-value"]++;
      App.renderStats();
    }
  },

  health_minus: function(){
    if(validate_minus('health-value')){
      characterStats['unassigned-points'] ++;
      characterStats["health-value"]--;
      App.renderStats();
    }
  },

  attack_plus: function(){
    if(validate_plus()){
      characterStats['unassigned-points'] --;
      characterStats["attack-value"]++;
      App.renderStats();
    }
  },

  attack_minus: function(){
    if(validate_minus('attack-value')){
      characterStats['unassigned-points'] ++;
      characterStats["attack-value"]--;
      App.renderStats();
    }
  },

  strength_plus: function(){
    if(validate_plus()){
      characterStats['unassigned-points'] --;
      characterStats["strength-value"]++;
      App.renderStats();
    }
  },

  strength_minus: function(){
    if(validate_minus('strength-value')){
      characterStats['unassigned-points'] ++;
      characterStats["strength-value"]--;
      App.renderStats();
    }
  },

  defence_plus: function(){
    if(validate_plus()){
      characterStats['unassigned-points'] --;
      characterStats["defence-value"]++;
      App.renderStats();
    }
  },

  defence_minus: function(){
    if(validate_minus('defence-value')){
      characterStats['unassigned-points'] ++;
      characterStats["defence-value"]--;
      App.renderStats();
    }
  }
};


