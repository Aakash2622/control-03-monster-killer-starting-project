const ATTACK_VALUE =10;
const MONSTER_ATTACK_VALUE =14;
const STRONG_ATTACK=17;
const HEAL_VALUE=20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';
const enteredValue = prompt("Maximuim value for you and monster ", "100");
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'STRONG_ATTACK';
const  LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL ='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let chosenMaxLife =parseInt(enteredValue);
if(isNaN(chosenMaxLife)){
    chosenMaxLife=100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;    
let battleLog=[];   
 
function writeToLog(ev,val,monsterHealth,playerHealth){
   let logEntry={
    event : ev,
    value : val,
    finalMonsterHealth : monsterHealth, 
    finalPlayerHealth : playerHealth
   };
   switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    default:
      logEntry = {};
  }

//   if(ev === LOG_EVENT_PLAYER_ATTACK){
//     logEntry ={
//         event : ev,
//         value : val,
//         target : 'MONSTER',
//         finalMonsterHealth : monsterHealth, 
//         finalPlayerHealth : playerHealth

//     };
//   }else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
//     logEntry ={
//         event : ev,
//         value : val,
//         target : 'MONSTER',
//         finalMonsterHealth : monsterHealth, 
//         finalPlayerHealth : playerHealth

//     };
//   }else if(ev === LOG_EVENT_MONSTER_ATTACK){
//     logEntry ={
//         event : ev,
//         value : val,
//         target : 'PLAYER',
//         finalMonsterHealth : monsterHealth, 
//         finalPlayerHealth : playerHealth

//     };
//   }else if(ev === LOG_EVENT_PLAYER_HEAL){
//     logEntry ={
//         event : ev,
//         value : val,
//         target : 'PLAYER',
//         finalMonsterHealth : monsterHealth, 
//         finalPlayerHealth : playerHealth

//     };
//   }else if(ev === LOG_EVENT_GAME_OVER){
//     logEntry ={
//         event : ev,
//         value : val,
//         finalMonsterHealth : monsterHealth, 
//         finalPlayerHealth : playerHealth

//     };
//   }
  battleLog.push(logEntry);
  //for loop
//   for(let i=0;i<battleLog.length;i++){
//     console.log(battleLog[i]);
//   }
  

}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
     resetGame(chosenMaxLife);

}
function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    if(currentPlayerHealth <=0 && hasBonusLife ){
        hasBonusLife =false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but bonus life saved you');
        

    }
    if(currentMonsterHealth <= 0 && currentPlayerHealth >0){
        alert('You won!');
        writeToLog(LOG_EVENT_MONSTER_ATTACK,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth >=0 ){
        alert('You lost');
        writeToLog(LOG_EVENT_MONSTER_ATTACK,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth <=0){
        alert('You have a draw ');
        writeToLog(LOG_EVENT_MONSTER_ATTACK,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
        reset();
     }
}

function attackMonster(mode){
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE :STRONG_ATTACK;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    //let macDamage;
    //let logEvent;
//    if(mode === MODE_ATTACK){
//        maxDamage = ATTACK_VALUE;
//        logEvent = LOG_EVENT_PLAYER_ATTACK;
//    }else {
//        maxDamage =STRONG_ATTACK;
//        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
//    }
   const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}
adjustHealthBars(chosenMaxLife);

function attackHandler(){
    attackMonster(MODE_ATTACK);
}
function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal to more than your max initial health."); 
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}
function printLogHandler(){
   // console.log(battleLog);
   let i=0;
  for(const logEntry of battleLog){
       console.log(`#${i}`);
       for(const key in logEntry){
        console.log(`${key} ==> ${logEntry[key]}`);
       }
       i++;
  }

}
  


attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);