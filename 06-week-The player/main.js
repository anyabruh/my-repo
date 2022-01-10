const gameContainer = document.querySelector('#game-container');
const finish = document.querySelector('.finish');
const main = document.querySelector('.main');
let player = document.querySelector('.player');
const playerHp = document.querySelector('.player-hp');

let moveBy = 10;


//This listener make the player move and locate himself of the map && i left console.log's down in case you want to verify his position
window.addEventListener('load', () => {
    player.style.position = 'absolute';
    player.style.left = 0;
    player.style.top = 0;
    mapGenerator();
});
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            player.style.left = parseInt(player.style.left) - moveBy + 'px';
            // console.log(player.style.left + ' left');
            if(player.style.left == -10 + 'px' || compare() == true){
                player.style.left = parseInt(player.style.left) + moveBy + 'px';
            }
            break;
        case 'ArrowRight':
            player.style.left = parseInt(player.style.left) + moveBy + 'px';
            // console.log(player.style.left + ' right');
            if(player.style.left == 600 + 'px' || compare() == true){
                player.style.left = parseInt(player.style.left) - moveBy + 'px';

            }
            break;
        case 'ArrowUp':
            player.style.top = parseInt(player.style.top) - moveBy + 'px';
            // console.log(player.style.top + ' up');
            if(player.style.top == -10 + 'px' || compare() == true){
                player.style.top = parseInt(player.style.top) + moveBy + 'px';               

            }
            break;
        case 'ArrowDown':
            player.style.top = parseInt(player.style.top) + moveBy + 'px';
            // console.log(player.style.top + ' down');
            if(player.style.top == 600 + 'px' || compare() == true){
                player.style.top = parseInt(player.style.top) - moveBy + 'px';

            }
            break;
    }
    playerWin();
});


//Down here I create the obstacles

let obstacleList = [];

function createObstacle(){
    let test = (Math.floor(Math.random() * 56) + 1) * 10;
    let test1 = (Math.floor(Math.random() * 56) + 1) * 10;

    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.position = 'absolute';
    obstacle.style.top = test + 'px';
    obstacle.style.left = test1 + 'px';
    gameContainer.append(obstacle);

    obstacleList.push(obstacle);
    
}

//This function generate the map with the obstacles

function mapGenerator(){
    for(i = 0; i < 400; i++){
        createObstacle();
    }
}

//This function compare obstacles position with the player position

function compare(){
    for(i = 0; i < obstacleList.length; i++){
        if(player.style.left == obstacleList[i].style.left && player.style.top == obstacleList[i].style.top){
            return true;
        }
    }
    return false;
}


function playerWin(){
    if(player.offsetLeft >= 570 && player.offsetTop >= 570){
        alert('You win the game');
        window.location.reload();
    }
}

//The code down below create the timer, and the time left for the player to win the round/lose/lose the game.

let startingSeconds = 15;
const timer = document.querySelector('.timer');

let refresh = setInterval(updateCountdown,1000);


function updateCountdown() {
    if(startingSeconds == 0){
        clearInterval(refresh);
        playerLostRound();
        if(hpNumber > 0){
            startingSeconds = 15;
            player.style.left = 0;
            player.style.top = 0;
            refresh = setInterval(updateCountdown,1000);
            timer.innerHTML = `Time left: ${startingSeconds}`;
        }
        return

    }
    startingSeconds--;
    timer.innerHTML = `Time left: ${startingSeconds} seconds`;
}

//Player HP

let hpNumber = 5;
let playerLifes = [];

for(i = 0; i < 5; i++){
    let score = document.createElement('div');
    score.classList.add('player-score');
    playerHp.append(score);
    playerLifes.push(score);
    
}

function playerLostRound(){
    if(startingSeconds == 0){
        playerLifes[hpNumber - 1].remove();
        hpNumber--;
    }
    playerLose();
}


function playerLose(){
    if(hpNumber == 0){
        alert('You lost the game');
        window.location.reload();
    }
}

