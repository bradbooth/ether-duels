var images = {};
var totalResources = 9;
var numResourcesLoaded = 0;
var context = document.getElementById('canvas').getContext("2d");

//1 2 3 4
//| | |_|___item code
//| |_______level requirement
//|_________item type (0=helmet,1=body,2=legs)

loadImage("0")

loadImage("1100");
loadImage("1101");
loadImage("1102");
loadImage("1103");

loadImage("2100");
loadImage("2101");
loadImage("2102");
loadImage("2103");

loadImage("3100");
loadImage("3101");
loadImage("3102");
loadImage("3103");


function loadImage(name) {
    images[name] = new Image();
    images[name].onload = function() {
        //Do something on image load
    }
    images[name].src = "images/" + name + ".png";
}




function loadCharacter(helmId, bodyId, legsId){
        console.log('Load character: ')
        console.log("helm:" , helmId)
        console.log("body:" , bodyId)
        console.log("legs:" , legsId)
        context.clearRect(0, 0, canvas.width, canvas.height);

        
        context.drawImage(images[legsId], 0,0);
        context.drawImage(images[bodyId], 0,0);
        context.drawImage(images[helmId], 0,0);

}


