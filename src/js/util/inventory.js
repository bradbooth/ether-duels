

function equip(inventoryItemCode, inventorySlot){
    if(inventoryItemCode % 100 != 0){
        if(characterStats){
            if(characterStats["inv" + inventorySlot + "-id"] == inventoryItemCode){
                temp = inventoryItemCode;
                itemType = getItemType(inventoryItemCode)

                console.log("temp", temp)
                console.log("itemType", itemType)

                if(itemType == 1){
                    characterStats["inv" + inventorySlot + "-id"] = characterStats["helmet-id"];
                    characterStats["helmet-id"] = inventoryItemCode;
                } else if(itemType == 2){
                    characterStats["inv" + inventorySlot + "-id"] = characterStats["body-id"];
                    characterStats["body-id"] = inventoryItemCode;
                } else if(itemType == 3){
                    characterStats["inv" + inventorySlot + "-id"] = characterStats["legs-id"];
                    characterStats["legs-id"] = inventoryItemCode;
                } else if(itemType == 4){
                    characterStats["inv" + inventorySlot + "-id"] = characterStats["weapon-id"];
                    characterStats["weapon-id"] = inventoryItemCode;
                }

                loadCharacter(characterStats)
            }
        }
    }
}

function unequip(itemCode, location){
    if(itemCode % 100 != 0){
        if(characterStats){
            //Check if theres an empty slot
            temp = itemCode
            console.log("temp", temp)
            if(characterStats["inv1-id"] == 0){
                characterStats["inv1-id"] = itemCode
                characterStats[location] = 0;
            }else if(characterStats["inv2-id"] == 0){
                characterStats["inv2-id"] = itemCode
                characterStats[location] = 0;
            }else if(characterStats["inv3-id"] == 0){
                characterStats["inv3-id"] = itemCode
                characterStats[location] = 0;
            }
            loadCharacter(characterStats)
        }
    }
}

function getItemType(itemCode){
    return Math.floor(itemCode / (2**10));
}

inventory = {

    unequipHelmet: function() {
        unequip(characterStats["helmet-id"], "helmet-id")
    },
    unequipBody: function() {
        unequip(characterStats["body-id"], "body-id")
    },
    unequipLegs: function() {
        unequip(characterStats["legs-id"], "legs-id")
    },
    unequipWeapon: function() {
        unequip(characterStats["weapon-id"], "weapon-id")
    },
    equip1: function(){
        equip(characterStats["inv1-id"], 1)
    },

    equip2: function(){
        equip(characterStats["inv2-id"], 2)
    },

    equip3: function(){
        equip(characterStats["inv3-id"], 3)
    }

}