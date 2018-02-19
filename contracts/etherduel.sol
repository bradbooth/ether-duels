pragma solidity ^0.4.18;

contract etherduel {

    struct character {
        uint level;
        uint health;
        uint attack;
        uint strength;
        uint defence; 
        uint unassignedPoints;
        uint timestamp;
        uint helmetId;
        uint bodyId;
        uint legsId;
        uint weaponId;
        uint hashid;
        bool dueling;

        uint[3] inventory; //Define as bytes5? 
    }

    struct item {
        uint attack;
        uint strength;
        uint defence;
        bool exists;
    }

   
   mapping(address => character) characters;
   mapping(uint => item) items;
   mapping(uint => address) duelQueue;
   
   function etherduel() public {
        //Init duel queue
        duelQueue[1] = 0;
        duelQueue[2] = 0;
        duelQueue[3] = 0;

        // 1 2 3 4
        // | | |_|___item code
        // | |_______level requirement
        // |_________item type (1=helmet,2=body,3=legs,4=weapon)
        //
        // Item codes should always be a min of (n * 1000 + 100) where n > 0 ie. 1100

        //Helmets
        //items[1100] = item(0,0,0,true);
        items[1101] = item(0,0,1,true);
        items[1102] = item(0,0,0,true);
        items[1103] = item(0,0,1,true);
        items[1104] = item(0,0,0,true);
        items[1104] = item(0,0,1,true);
        //Bodies
        //items[2100] = item(0,0,0,true);
        items[2101] = item(0,0,1,true);
        items[2102] = item(0,0,0,true);
        items[2103] = item(0,0,1,true);
        items[2104] = item(0,0,0,true);
        items[2105] = item(0,0,1,true);
        //Legs
        //items[3100] = item(0,0,0,true);
        items[3101] = item(0,0,1,true);
        items[3102] = item(0,0,0,true);
        items[3103] = item(0,0,1,true);
        items[3104] = item(0,0,0,true);
        items[3105] = item(0,0,1,true);
        //Weapons
        //items[4100] = item(0,0,1,true);
        items[4101] = item(0,0,1,true);
        items[4102] = item(0,0,1,true);
        items[4103] = item(0,0,1,true);
        items[4104] = item(0,0,1,true);
        items[4105] = item(0,0,1,true);
        items[4106] = item(0,0,1,true);
        items[4107] = item(0,0,1,true);
        items[4108] = item(0,0,1,true);
   }
   
   //Create a new character
   function createCharacter() public {
       resetCharacter(msg.sender);
       generateRandomItem(msg.sender);
   }
   
   //Get characters stats
   function getCharacter() 
            public 
            view 
            returns (uint _level, 
                     uint _health, 
                     uint _attack, 
                     uint _strength, 
                     uint _defence, 
                     uint _unassignedPoints,
                     uint _helmetid,
                     uint _bodyid,
                     uint _legsid,
                     uint _weaponid,
                     uint _inv0,
                     uint _inv1,
                     uint _inv2,
                     uint _hashid)
    {

       character memory _character = characters[msg.sender];
       _level = _character.level;
       _health = _character.health;
       _attack = _character.attack;
       _strength = _character.strength;
       _defence = _character.defence;
       _unassignedPoints = _character.unassignedPoints;
       _helmetid = _character.helmetId;
       _bodyid = _character.bodyId;
       _legsid = _character.legsId;
       _weaponid = _character.weaponId;
       _inv0 = _character.inventory[0];
       _inv1 = _character.inventory[1];
       _inv2 = _character.inventory[2];
       _hashid = _character.hashid;
   }

   //Update character stats
   function updateCharacter(uint _health, uint _attack, uint _strength, uint _defence, uint _unassignedPoints) public {
        character storage _character = characters[msg.sender];
        //validate
        if (_unassignedPoints == 0) {
            if (_health + _attack + _strength + _defence + _unassignedPoints == _character.health + _character.attack + _character.strength + _character.defence + _character.unassignedPoints ) {
                if (_health >= _character.health && _attack >= _character.attack && _strength >= _character.strength && _defence >= _character.defence) {
                    _character.health = _health;
                    _character.attack = _attack;
                    _character.strength = _strength;
                    _character.defence = _defence;
                    _character.unassignedPoints = _unassignedPoints; 
                }
            }
        }
   }
   
   // Join duel queue
   function enterDuelQueue() public {

       if (characters[msg.sender].unassignedPoints != 0 ) {
           return;
       }

       uint characterLevel = characters[msg.sender].level;
       if (duelQueue[characterLevel] == msg.sender) {
           // Already in the queue
           return;
       } else if (duelQueue[characterLevel] == 0) {
           // Enter the queue
           duelQueue[characterLevel] = msg.sender;
       }else {
           // Theres someone else in queue - fight!
           address winner = duel(duelQueue[characterLevel], msg.sender);
           levelUp(winner);
           duelQueue[characterLevel] = 0;
       }
   }
   
   // Duel two characters
   function duel(address p1, address p2) private returns(address winner) {

        uint rnd = genRandom();
        uint8 rd = shift10(rnd);
        address first;
        address second;
        if (rd < 5) {
            //p1 goes first
            first = p1;
            second = p2;
        } else {
            //p2 goes first
            first = p2;
            second = p1;
        }
       //max ten rounds
       for (uint8 i = 0; i < 10; i++) {
            rd = shift10(rnd);
            // Chance to hit
            if (rd + (characters[first].attack / 3) > 5) {
                // Do damage
                characters[second].health -= calcDamage(first, second);
                if (characters[second].health <= 0) {
                    resetCharacter(second);
                    winner = first;
                    break;
                }
            }
            rd = shift10(rnd);
            // Chance to hit
            if (rd + (characters[second].attack / 3) > 5) {
                // Do damage
                characters[first].health -= calcDamage(second, first);
                if (characters[first].health <= 0) {
                    resetCharacter(first);
                    winner = second;
                    break;
                }
            }   
       }

       //Nobody was killed - winner has most health remaining
       // Unfair - what if even?
       if (characters[p1].health > characters[p2].health) {
           resetCharacter(p2);
           winner = p1;
       } else {
           resetCharacter(p1);
           winner = p2;
       }

   }

   function calcDamage(address attacker, address defender) private view returns (uint finalDamage) {
       uint damage = (characters[attacker].strength - characters[defender].defence);
       if (damage <= 0) {
           damage = 1;
       } else {
           damage = damage;
       }

       if (characters[defender].health < damage) {
           //Cant bring health lower than 0
           finalDamage = characters[defender].health;
       } else {
           finalDamage = damage;
       }
   }

    // Level up a character
   function levelUp(address charAddress) private {
        characters[charAddress].level++;
        characters[charAddress].unassignedPoints += 3;
        generateRandomItem(charAddress);
   }

    // Reset a character to base stats
   function resetCharacter(address _address) private {
       characters[_address].level = 1;
       characters[_address].health = 10;
       characters[_address].attack = 1;
       characters[_address].strength = 1;
       characters[_address].defence = 1;
       characters[_address].unassignedPoints = 3;
       characters[_address].timestamp = block.timestamp;
       characters[_address].helmetId = 0;
       characters[_address].bodyId = 0;
       characters[_address].legsId = 0;
       characters[_address].weaponId = 0;
       characters[_address].inventory[0] = 0; //Can this be consolidated into one call?
       characters[_address].inventory[1] = 0;
       characters[_address].inventory[2] = 0;
   }


        // 1 2 3 4
        // | | |_|___item code
        // | |_______level requirement
        // |_________item type (1=helmet,2=body,3=legs,4=weapon)

    function generateRandomItem(address adr) private {
        //Chance at getting an item after leveling up/creation
        //generate a random item
        uint itemType = ((genRandom() % 4) + 1) * 1000;
        uint itemLevel = ((genRandom() % characters[adr].level) + 1) * 100;
        uint itemId = genRandom() % 6;
        uint itemhash = itemType + itemLevel + itemId;
        characters[adr].hashid = itemhash;
        // Check if it maps to an exisiting item
        // TODO - This should add to inventory in future
        if (items[itemhash].exists) {
            //Add to inventory
            addToInventory(itemhash, adr);

            //       if (itemType == 1000) {
            //           characters[adr].helmetId = itemhash;
            // } else if (itemType == 2000) {
            //           characters[adr].bodyId = itemhash;
            // } else if (itemType == 3000) {
            //           characters[adr].legsId = itemhash;
            // } else if (itemType == 4000) {
            //           characters[adr].weaponId = itemhash;
            // }
        }
    }

    // Add an item to the inventory if there is space
    function addToInventory(uint itemCode, address adr) private {
        for (uint i = 0; i < characters[adr].inventory.length; i++) {
            if (characters[adr].inventory[i] == 0) {
                characters[adr].inventory[i] = itemCode;
                break;
            }
        }
    }

    // Equip an item from inventory to a character
    function equipItem(uint itemCode, address adr) private {
        for (uint i = 0; i < characters[adr].inventory.length; i++) {
            if (characters[adr].inventory[i] == itemCode) {
                uint itemType = getItemType(itemCode);
                uint temp = itemCode;
                //If the item is a helmet, equip in helmet spot, etc.
                if (itemType == 1) {
                    characters[adr].inventory[i] = characters[adr].helmetId;
                    characters[adr].helmetId = itemCode;
                } else if (itemType == 2) {
                    characters[adr].inventory[i] = characters[adr].bodyId;
                    characters[adr].bodyId = temp;
                } else if (itemType == 3) { 
                    characters[adr].inventory[i] = characters[adr].legsId;
                    characters[adr].legsId = temp;
                } else if (itemType == 4) {
                    characters[adr].inventory[i] = characters[adr].weaponId;
                    characters[adr].weaponId = temp;
                }
                break;
            }
        }
    }

   // Generate a 'random' number - needs to be improved!
   function genRandom() private view returns (uint randomNumber) {
        randomNumber = uint256(keccak256(block.timestamp)) + 1;
   }

    //Shift a number by 1 digit (base 10) 
   function shift10(uint256 randomNumber) private pure returns (uint8 digit) {
        digit = (uint8) (randomNumber % 10);
        randomNumber = randomNumber / 10;
   }

   // Item codes should always be a min of (n * 1000 + 100) where n > 0 ie. 1100
   function getItemType(uint itemCode) private returns (uint itemType) {
        itemType = itemCode / (2**10);
   }

}