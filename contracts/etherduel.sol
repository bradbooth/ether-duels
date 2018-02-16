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
        uint helmet_id;
        uint body_id;
        uint legs_id;
        uint hashid;
        bool dueling;

        uint[] inventory;
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
        // |_________item type (0=helmet,1=body,2=legs)

        //Helmets
        items[1100] = item(0,0,0,true);
        items[1101] = item(0,0,1,true);
        items[1102] = item(0,0,0,true);
        items[1103] = item(0,0,1,true);

        //Bodies
        items[2100] = item(0,0,0,true);
        items[2101] = item(0,0,1,true);
        items[2102] = item(0,0,0,true);
        items[2103] = item(0,0,1,true);
        //Legs
        items[3100] = item(0,0,0,true);
        items[3101] = item(0,0,1,true);
        items[3102] = item(0,0,0,true);
        items[3103] = item(0,0,1,true);
   }
   
   //Create a new character
   function createCharacter() public {
       characters[msg.sender].inventory = new uint[](6);
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
                     uint _hashid)
    {

       character memory _character = characters[msg.sender];
       _level = _character.level;
       _health = _character.health;
       _attack = _character.attack;
       _strength = _character.strength;
       _defence = _character.defence;
       _unassignedPoints = _character.unassignedPoints;
       _helmetid = _character.helmet_id;
       _bodyid = _character.body_id;
       _legsid = _character.legs_id;
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
       characters[_address].helmet_id = 1100;
       characters[_address].body_id = 2100;
       characters[_address].legs_id = 3100;
   }

    function generateRandomItem(address adr) private {
        //Chance at getting an item after leveling up/creation
        //generate a random item
        uint itemType = ((genRandom() % 3) + 1) * 1000;
        uint itemLevel = ((genRandom() % characters[adr].level) + 1) * 100;
        uint itemId = genRandom() % 4;
        uint itemhash = itemType + itemLevel + itemId;
        characters[adr].hashid = itemhash;
        // Check if it maps to an exisiting item
        // TODO - This should add to inventory in future
        if (items[itemhash].exists) {
            //Add to inventory
            characters[adr].inventory.push(itemhash);
                  if (itemType == 1000) {
                      characters[adr].helmet_id = itemhash;
            } else if (itemType == 2000) {
                      characters[adr].body_id = itemhash;
            } else if (itemType == 3000) {
                      characters[adr].legs_id = itemhash;
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
 
}