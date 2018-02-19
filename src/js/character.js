var images = {};
var totalResources = 15;
var numResourcesLoaded = 0;
var characterCanvas = document.getElementById('character-canvas').getContext("2d");
var inventoryCanvas = document.getElementById('inventory-canvas').getContext("2d");


//Coordinates
var headIconX = 132; var headIconY = 36;
var bodyIconX = 132; var bodyIconY = 102;
var legsIconX = 132; var legsIconY = 170;
var weaponIconX= 65; var weaponIconY = 102;

var inv1X = 73; var inv1Y = 238;
var inv2X = 132; var inv2Y = 238;
var inv3X = 190; var inv3Y = 238;



//1 2 3 4
//| | |_|___item code
//| |_______level requirement
//|_________item type (0=helmet,1=body,2=legs)

loadImage("0")
loadImage("inventory")
loadImage("inventory-none-icon")



//Helm
loadImage("1100"); loadImage("1100-icon"); 
loadImage("1101"); loadImage("1101-icon");
loadImage("1102"); loadImage("1102-icon");
loadImage("1103"); loadImage("1103-icon");
loadImage("1104"); loadImage("1104-icon");
loadImage("1105"); loadImage("1105-icon");

//Body
loadImage("2100"); loadImage("2100-icon");
loadImage("2101"); loadImage("2101-icon");
loadImage("2102"); loadImage("2102-icon");
loadImage("2103"); loadImage("2103-icon");
loadImage("2104"); loadImage("2104-icon");
loadImage("2105"); loadImage("2105-icon");

//Legs
loadImage("3100"); loadImage("3100-icon");
loadImage("3101"); loadImage("3101-icon");
loadImage("3102"); loadImage("3102-icon");
loadImage("3103"); loadImage("3103-icon");
loadImage("3104"); loadImage("3104-icon");
loadImage("3105"); loadImage("3105-icon");

//Weapon
loadImage("4100"); loadImage("4100-icon");
loadImage("4101"); loadImage("4101-icon");
loadImage("4102"); loadImage("4102-icon");
loadImage("4103"); loadImage("4103-icon");
loadImage("4104"); loadImage("4104-icon");
loadImage("4105"); loadImage("4105-icon");


function loadImage(name) {
    images[name] = new Image();
    images[name].onload = function() {
        //Do something on image load
    }
    images[name].src = "images/" + name + ".png";
}

function genRandomOutfit(){
    // characterStats['helmet-id'] = Math.floor(Math.random() * 5 + 1) + 1100;
    // characterStats['body-id'] = Math.floor(Math.random() * 5 + 1) + 2100;
    // characterStats['legs-id'] = Math.floor(Math.random() * 5 + 1) + 3100;
    // characterStats['weapon-id'] = Math.floor(Math.random() * 5 + 1) + 4100;

    characterStats['helmet-id'] = 0
    characterStats['body-id'] = 0
    characterStats['legs-id'] = 0
    characterStats['weapon-id'] = 0

    characterStats['inv1-id'] = (Math.floor(Math.random() * 4 + 1) * 1000) + 100 + Math.floor(Math.random() * 5 + 1)
    characterStats['inv2-id'] = (Math.floor(Math.random() * 4 + 1) * 1000) + 100 + Math.floor(Math.random() * 5 + 1)
    characterStats['inv3-id'] = (Math.floor(Math.random() * 4 + 1) * 1000) + 100 + Math.floor(Math.random() * 5 + 1)
    //characterStats['inv2-id'] = 0
    //characterStats['inv3-id'] = 0

    loadCharacter(characterStats);
}



//function loadCharacter(helmId, bodyId, legsId, weaponId, inv1, inv2, inv3){
function loadCharacter(characterStats){

        console.log('Load character: ')
        console.log("helm:" , characterStats['helmet-id'])
        console.log("body:" , characterStats['body-id'])
        console.log("legs:" , characterStats['legs-id'])
        console.log("weapon:" , characterStats['weapon-id'])
        console.log("Inventory:" , characterStats['inv1-id'] + ', ' + characterStats['inv2-id'] + ', ' + characterStats['inv3-id'])

        characterCanvas.clearRect(0, 0, 300, 300);
        inventoryCanvas.drawImage(images["inventory"], 0,0);

        // Character - needs to be improved
        if(characterStats['legs-id'] == 0){
            characterCanvas.drawImage(images['3100'], 0, 0)
        } else {
            characterCanvas.drawImage(images[characterStats['legs-id']], 0,0);
            inventoryCanvas.drawImage(images[characterStats['legs-id'] + '-icon'], legsIconX,legsIconY)
        }

        if(characterStats['body-id'] == 0){
            characterCanvas.drawImage(images['2100'], 0, 0)
        } else {
            characterCanvas.drawImage(images[characterStats['body-id']], 0,0);
            inventoryCanvas.drawImage(images[characterStats['body-id'] + '-icon'], bodyIconX,bodyIconY)
        }

        if(characterStats['helmet-id'] == 0){
            characterCanvas.drawImage(images['1100'], 0, 0)
        } else {
            characterCanvas.drawImage(images[characterStats['helmet-id']], 0,0);
            inventoryCanvas.drawImage(images[characterStats['helmet-id'] + '-icon'], headIconX,headIconY)
        }

        if(characterStats['weapon-id'] == 0){
            characterCanvas.drawImage(images['4100'], 0, 0)
        } else {
            characterCanvas.drawImage(images[characterStats['weapon-id']], 0,0);
            inventoryCanvas.drawImage(images[characterStats['weapon-id'] + '-icon'], weaponIconX,weaponIconY)
        }

        //Equiped 

        //Inventory
        if(characterStats['inv1-id'] % 100 == 0){
            inventoryCanvas.drawImage(images['inventory-none-icon'], inv1X, inv1Y)
        } else {
            inventoryCanvas.drawImage(images[[characterStats['inv1-id'] + "-icon"]], inv1X, inv1Y)
        }

        if(characterStats['inv2-id'] % 100 == 0){
            inventoryCanvas.drawImage(images['inventory-none-icon'], inv2X, inv2Y)
        } else {
            inventoryCanvas.drawImage(images[[characterStats['inv2-id'] + "-icon"]], inv2X, inv2Y)
        }

        if(characterStats['inv3-id'] % 100 == 0){
            inventoryCanvas.drawImage(images['inventory-none-icon'], inv3X, inv3Y)
        } else {
            inventoryCanvas.drawImage(images[[characterStats['inv3-id'] + "-icon"]], inv3X, inv3Y)
        }

}


