var readlineSync = require('readline-sync');


// New Foe
function Foes(name) {
    this.name = name;
    this.hp = 100;
    this.item = null;
};
// New Player
function Player(name) {
    this.name = name;
    this.hp = 250;
    this.inventory = [];
};

var theFoes = [
    new Foes("Mordroc"),
    new Foes("Singe"),
    new Foes("Giddy"),
    new Foes("Spider")
]
theFoes[0].item = "Dragon Essence";
theFoes[1].item = "Magic Arrows";

// walking with chance to encounter
function walk() {
    console.log(player.name + " walks along the path.");

    if (Math.random() < .33) {
        randomEncounter();
    } else {
        console.log("You continue to walk along the path, nothing out of the ordinary happens.");
    }
};

//Random encounter with the foe
function randomEncounter() {
    var enemy = theFoes[Math.floor(Math.random() * theFoes.length)];
    switch (enemy.name) {
        case "Mordroc":
            printMordroc();
            break;
        case "Singe":
            printSinge();
            break;
        case "Giddy":
            printGiddy();
            break;
        case "Spider":
            printSpider();
            break;
    }
    console.log(enemy.name + " has leaped on to the trail in front of you!!!");
    if (battle(enemy)) {
        console.log(player.name + " has won this fight!!!")
    }
};

function battle(enemy) {
    while (player.hp > 0 && enemy.hp > 0) {
        console.log();
        var input = readlineSync.question("Your have " + player.hp + " health, and " + enemy.name + " has " + enemy.hp + " health. Do you want to [a] attack or [r] run to escape?")

        switch (input) {
            case 'a':
                attack(enemy);
                if (enemy.hp < 0) {
                    console.log(enemy.name + " has died!");
                    if (enemy.item != null) {
                        console.log("You took " + enemy.item + " from " + enemy.name);
                        player.inventory.push(enemy.item);
                    } else if {
                        player.inventory = ["Dragon Essence", "Magic Arrows"];
                        console.log("You have won the game!!!");
                        break;
                    } else {
                        console.log("They did not have anything for you to take.");
                    }
                    // Reset enemies HP
                    enemy.hp = 100;
                    return true;
                }
                enemyAttack(enemy);
                if (player.hp <= 0) {
                    died();
                    return;
                }

                break;
            case 'r':
                if (run()) {
                    return false;
                } else {
                    //Do nothing
                }
                break;
        }
    }
};

function attack(enemy) {
    console.log("You attacked " + enemy.name);
    // Attack for between 50 and 150 damage
    var damage = Math.floor(Math.random() * 75) + 25;
    enemy.hp -= damage;
    console.log(" and did " + damage + " damage. " + enemy.name + " now has " + enemy.hp + " health left.")
};

function enemyAttack(enemy) {
    console.log(enemy.name + " attacks you ");
    // Attack for between 50 and 150 damage
    var damage = Math.floor(Math.random() * 75) + 25;
    player.hp -= damage;
    console.log("and does " + damage + " damage. You now have " + player.hp + " health left.")
};

function died() {
    console.log("You have ended your life with a terrible demise.");
};

function run() {
    console.log(player.name + " attempts to flee.");
    var escape = Math.floor(Math.random() * 2) % 2 == 0 ? true : false;
    if (escape) {
        console.log(" You succeeded in escaping.");
    } else {
        console.log(" You did not get away.");
    }
    return escape;
};

function print() {
    console.log("Sir " + player.name + " a Valiant Knight");
    console.log("Health: " + player.hp);
    console.log("Inventory: " + player.inventory);
}

function printWelcome() { 
    console.log(`     
    88888888ba,                                                              
    88        8b                                                           88  
    88         8b                                                             
    88         88 8b,dPPYba, ,adPPYYba,  ,adPPYb,d8  ,adPPYba,  8b,dPPYba,    ,adPPYba,  
    88         88 88P     "Y8""      Y8 a8"     Y88 a8"     "8a 88P     "8a   I8[    ""  
    88         8P 88         ,adPPPPP88 8b       88 8b       d8 88       88     "Y8ba,   
    88      .a8P  88         88,    ,88 "8a,   ,d88 "8a,   ,a8" 88       88   aa    ]8I  
    88888888Y8P   88          "8bbdP"Y8   "YbbdP"Y8   "YbbdP""  88       88    "YbbdP"" 
                                         aa,    ,88                           
                                          "Y8bbdP"     
    88                               
    88                     88         
    88                                     
    88          ,adPPYYba, 88 8b,dPPYba,   
    88          ""      Y8 88 88P    "Y8   
    88          ,adPPPPP88 88 88          
    88          88,    ,88 88 88           
    88888888888  "8bbdP"Y8 88 88  `); 
};


function printMordroc() { 
    console.log(`
                  ^^^
                 /___\
                '.* *.'
               _)_*_*_(_
              / _______ \
             _\_)/___\(_/_
            / _((\- -/))_ \
            \ \())(-)(()/ /
             ' \(((()))/ '
            / ' \)).))/ ' \
           / _ \ - | - /_  \
          (   ( .;''';. .'  )
          _\"__ /    )\ __"/_
            \/  \   ' /  \/
             .'  '...' ' )
              / /  |  \ \
             / .   .   . \
            /   .     .   \
           /   /   |   \   \
         .'   /    b    '.  '.
     _.-'    /     Bb     '-. '-._
 _.-'       |      BBb       '-.  '-.
(___________\____.dBBBb.________)____)   `);
};

function printGiddy() {
    console.log(`
                /|  /|
                J(|----.
               /   ))))))
              J    ' ' ' \
              F     (.) (.)--._
             /                  .
            J                   |
            F       ._         .'
           J           -.____.'
           F           \
          J             \.
          |   .   .      \\
 ,,,      |     .   .     L 
\VVV'     |       .       | 
 \W|      J               |
  \|    .' \              F
     --'    )    ___..-   ( .-
           /   .'      . //' /
            .  \         <_.'
              ._|               `);
};

function printSinge() {
    console.log(`
                                 ,- 
                               //        
                              /:      ,
                             ;.(     //
                   |   ,     / |    //
                   |\  |\    |,|   //
                |  (\  (\    | |   |(
                (\  \\  \\   |,|   ;|
            .   ||   \\  \\  | (   ;( 
            \\   \\  \\  \\  |.\\  ((                              
             \\   \\  \\  \\  \\ \;/:\                 
               \\  \\  \'. \\_,\\ /\""-._                
                \\  \\  \ \-"   \/  ;._ ".
               ___\\-\\-" \ \_  /,  |_ "._\
         _,--""___ \ \,_   "-_"- |".|(._ ".".-.
     _,-"_,--"""__ ) "."-_    "--\ \"("o\_\ "- ".
   ,",-""" _.-'''_-"   "-_"-.__   \ \_\_//\)__"\_)
 ,"    ',-'  ,-""   7"  _ "-.._""_>\__ ""'"__ ""  -._
        ;  ," ,-",'/  ,":\.            """___ ""-._  ".   )
        ;,"_," ,' / ,"}}::\\          ... \____''' "\  '.|\
       ,","   :  / /{{)/:::"\__,---._    \  \_____'''\    \
      , ,"_  ;  / / ///::::::::' ,-"-\    \__   \____''\ \ \
     ,,"    ;| ";; /}}/::'  ':::(._  ."-.__  """--    '_\ \ \
    ('       ;// / {;;:'     ':; / ._."""  ""-.._  "-. " (   )
    /         )(/ <";"'       / /_.(             "_  "-_"\ );
              (/ <";"        / / ,(                "._ _".\; 
               |<";"        / /"-"                "  
               <";"        / /__,;  `); 
};
         
function printSpider() {
    console.log(`
                 (             
                  )            
                 (             
          /\  --"""--  /\      
         //\\/  ,,,  \//\\     
         |/\| ,;;;;;, |/\|     
         //\\\"-""-" ///\\     
        //  \/   .   \/  \\    
       (| ,-_| \ | / |_-, |)   
         // __\.-.-./__ \\     
        // /.-(() ())-.\ \\    
       (\ |)   '---'   (| /)   
          (|           |)      
          \)           (/       `);
};

console.log("Welcome to the Dragons Lair Adventure!!!")
console.log(printWelcome());

var name = readlineSync.question("What is your name, my Valiant Knight? ");
player = new Player(name);

// Main game while loop
while (player.hp > 0) {
    console.log();
    console.log("Enter 'w' to walk down the path. Enter 'print' to see your stats.");

    var input = readlineSync.question("Continue if you dare? ");

    if (input === "w") {
        walk();
    } else if (input === "print") {
        print();
    } else {
        console.log("Whuuuuuuuuut!!!!");
    }
};
