//"GameObject" is a base class
// every object in our game will have width, height, position and can move
const heartsDiv = document.querySelector('.heart');

let currentObstacle;
let countRepeat;

class GameObject {
    constructor() {
      this.width = 50;
      this.height = 50;
      this.x = 0;
      this.y = 0;
      this.generateRef();
    }
  
    // we need a html ref in our every game object
    // otherwise the user can't have visual feedback
    generateRef() {
      this.ref = document.createElement("div");
      this.ref.style.width = `${this.width}px`;
      this.ref.style.height = `${this.height}px`;
      this.ref.style.position = "absolute";
      this.ref.style.top = 0;
      this.ref.style.left = 0;
  
      document.getElementById("game-scene").appendChild(this.ref);
    }
  
    move(x, y) {
      this.x = x;
      this.y = y;
      // we use the css rules on our html ref so the we can move the object on screen
      // for more info on transform: https://css-tricks.com/almanac/properties/t/transform/
      this.ref.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  
    // when a game object leave our screen we need too destroy is html ref
    removeRef() {
      this.ref.remove();
    }
  }
  
  // Player will inherit all the functionality of the GameObject
  class Player extends GameObject {
    constructor() {
      // "super" will call the "GameObject" constructor before any instruction are called in "Player" constructor
      super();
      // because we had called "super" above we have access to "this.ref"
      this.ref.style.background = "blue";
      this.life = 3;
      // he inherited "move" method is use to position the player at the player creation/construction
      this.move(50, 225);
    }
  
    // the player can only move up and down
    // we use "move" method to define specialized method for moving the player
  
    moveUp() {
      // we use some condition to make sure that the player will not leave the game scene
      if (this.y - 25 >= 0) this.move(this.x, this.y - 25);
    }
  
    moveDown() {
      if (this.y + 25 <= 500 - this.height) this.move(this.x, this.y + 25);
    }
  }
  
  // "Obstacle" is similar with player, but it can only move from right to left
  // when an obstacle is created it is position outside the game scene
  class Obstacle extends GameObject {
    constructor(id) {
      super();
      this.ref.style.background = "red";
      this.move(1060, 25);
      this.id = id;
    }
  
    moveLeft() {
      this.move(this.x - 5, this.y);
    }
  }

  let id = 0
  
  // we need a manager of obstacle that is responsible for creating, moving and removing obstacles
  class ObstacleFactory {
    constructor() {
      // all the obstacles be held in this list
      this.obstacles = [];
      // this.id = id
    }
  
    // when an obstacle is create first is positioned random on y axis then it is stored
    createObstacle() {
      const obstacle = new Obstacle(id);
      obstacle.move(1060, Math.floor(Math.random() * 450));
      // console.log(obstacle);
      this.obstacles.push(obstacle);
      id++
    }
  
    // the obstacles are destroyed when he leave the game scene
    // to destroy an object you need to make sure the nothing can refer to it anymore
    // in this case all the obstacles are held in "this.obstacles" list
    // if we remove the obstacles from then there no other way to refer to that object
    destroyObstacles() {
      this.obstacles = this.obstacles.filter((obstacle) => {
        if (obstacle.x < -50) {
          // before filtering out the obstacle from the list we need to tell the DOM to remove its obstacle html ref as well
          obstacle.removeRef();
          return false;
        }
  
        return true;
      });
    }
  
    // every time this method is called all the obstacles will move from right o left
    moveObstacles() {
      for (const obstacle of this.obstacles) {
        obstacle.moveLeft();
      }
    }
  }
  
  /// --- User  input
  
  // "keyUpPress" and "keyDownPress" will be checked in the game loop
  // depending on there values different methods will be called in the a game loop iteration
  
  let keyUpPress = false;
  let keyDownPress = false;
  
  // to change the values of "keyUpPress" we need to check if the keyboard buttons were pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      keyUpPress = true;
    }
  
    if (event.key === "ArrowDown") {
      keyDownPress = true;
    }
  });
  
  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") {
      keyUpPress = false;
    }
  
    if (event.key === "ArrowDown") {
      keyDownPress = false;
    }
  });
  
  /// --- User  input
  
  // -- Collision Detection
  // without a way to detect with the player overlaps one of the obstacles the game will not end
  function collisionDetection(player, obstacles) {
    for (const obstacle of obstacles) {
      // console.log(player.x, obstacle.x);
      
      if (
        (player.x <= obstacle.x &&
          obstacle.x <= player.x + player.width &&
          player.y <= obstacle.y &&
          obstacle.y <= player.y + player.height) ||
          (player.x <= obstacle.x + obstacle.width &&
          obstacle.x + obstacle.width <= player.x + player.width &&
          player.y <= obstacle.y + obstacle.height &&
          obstacle.y + obstacle.height <= player.y + player.height)
          ){
            currentObstacle = obstacle;
            // console.log(currentObstacle);
            return true;
          }
        }
        
        return false;
      }
      
      // here is were we actually use the classes defined above
      class PlayerLives {
        constructor() {
          this.width = 30;
          this.height = 30;
          this.createHeart();
        }
     
        createHeart() {
          this.ref = document.createElement('img');
          this.ref.src = 'heart.png';
          this.ref.style.width =  `${this.width}px`
          this.ref.style.height =  `${this.height}px`
          
          
          
          heartsDiv.appendChild(this.ref);      
        }
        
        burnHeart() {
          this.ref.remove();
        }
      }

      let livesNr = 0;

      class PlayerLivesCount {
        constructor() {
          this.array = [];
          this.createLife();
        }

        createLife() {
          for(let i = 0; i <= 2 ; i++){
            // const hearts = new PlayerLives();
            this.array.push(new PlayerLives())
          }
          
        }
        deleteHeart() {
          this.array[livesNr].burnHeart();
          player.life--;
          livesNr ++;
        }
      }
      
      
      const player = new Player();
      const obstacleFactory = new ObstacleFactory();
      const heart = new PlayerLivesCount();
      
      // we need count for creating obstacles based on conditions
      let count = 0;
      
      // Game Loop
      // our game will run at the speed of the interval
      // the callback function of the interval will update our game every 50ms
      // our objects method will be called at the interval callback
      
      let seconds = 0

     let secondCounter = setInterval(() => {
      seconds++
    },1000)
    
    let playerScore = {
      name: 'Alex',
      score: 0
    }

      
      
      let gameLoop = setInterval(() => {
        
        // depending on the values of "keyUpPress" or "keyDownPress" we update the player position
        if (keyUpPress) player.moveUp();
        if (keyDownPress) player.moveDown();
        
        // we spawn object only from 10 to 10 game loops
        if (count % 10 === 0) obstacleFactory.createObstacle();
        
        // we move all the obstacles on every game loop
        obstacleFactory.moveObstacles();
        
        // if the player collide with any of the obstacles we need to close the game loops, alert the user and refresh the game
        if (collisionDetection(player, obstacleFactory.obstacles)) {
          if(currentObstacle !== countRepeat) {
            heart.deleteHeart();
            countRepeat = currentObstacle
            // return heart.deleteHeart();
          }
          if(player.life == 0){
            playerScore.score = seconds
            clearInterval(gameLoop);
            setScore();
          alert("You lost the game and you score is " + seconds);
          window.location.reload();
        }
      }

      
      // we check every game loop if we need to destroy objects outside of the game scene
      obstacleFactory.destroyObstacles();
      
      count++;
    }, 50);

 
  function setScore() {
    fetch('https://contact-agenda-rest-api.herokuapp.com/game_score_board',{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(playerScore),
    })
    .then(res => {
      console.log('Request complete', res);
    })
    .then(data => console.log(data));
  }

  getUsers();

  function getUsers() {
    fetch('https://contact-agenda-rest-api.herokuapp.com/game_score_board')
    .then(response => response.json())
    .then(data => console.log(data));
  }



