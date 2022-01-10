// ## Digital Timer

// 1. Vream sa afisam un timer in browser, va incepe cu 00:00:00
// 2. Sa se faca update in real time ( la fiecare secunda )

// Cum structuam in html timer-ul?
// 00:00:00
// Solutia 1: fiecare grup de 00 intr-un span cu id
//
// Solutia 2: punem totul intr-un div - <div>00:00:00</div>

let hoursHTML = document.getElementById("hours");
let minutesHTML = document.getElementById("minutes");
let secondsHTML = document.getElementById("seconds");

//buttons

let startTime = document.querySelector('#start-time');
let stopTime = document.querySelector('#stop-time');
let resetTime = document.querySelector('#reset-time');
let saveTime = document.querySelector('#save-time');
let laps = document.querySelector('#laps');

let seconds = 0;
let minutes = 0;
let hours = 0;

/**
 * @param {number} value - numbarul de sec/min/hr
 * @returns {string} adauga 0 daca value este mai mic de 10
 */
function formatTime(value) {
  // console.log(seconds); // putem avem acces aici
  // seconds = 0
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}
// va gasi minutes din scopul local deci nu mai merge la minutes var globala
// function timeLogic(minutes) { 
function timeLogic() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  console.log('seconds', seconds)
  console.log('minutes', minutes)
  console.log('hours', hours)
}

// De ce folosim variabile globale?
// Pentru ca vrem sa pastram valorile intre executile date de setInterval

// setInterval(function () {
//   timeLogic(); // apelam timeLogic cu valorile din variabilele globale

//   updateTimeHtml(seconds, minutes, hours);
// }, 1000);

function updateTimeHtml(seconds, minutes, hours) {
  secondsHTML.innerHTML = formatTime(seconds);
  minutesHTML.innerHTML = formatTime(minutes);
  hoursHTML.innerHTML = formatTime(hours);
}


let timeCounter = null;


startTime.addEventListener('click',function(){
    if(timeCounter === null){
        timeCounter = setInterval(function () {
            timeLogic(); // apelam timeLogic cu valorile din variabilele globale
          
            updateTimeHtml(seconds, minutes, hours);
          }, 1000);
    }
     
   
})

stopTime.addEventListener('click',function(){
    clearInterval(timeCounter);
    timeCounter = null;
})

let lapCount = document.createElement('ol');
laps.append(lapCount);

saveTime.addEventListener('click',function(){
   let timerLap = document.createElement('li');
   timerLap.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
   lapCount.append(timerLap);
    

})

resetTime.addEventListener('click',function(){
    seconds = 0;
    secondsHTML.innerHTML = '00';
    
    minutes = 0;
    minutesHTML.innerHTML = '00';
    
    hours = 0;
    hoursHTML.innerHTML = '00';
    
    lapCount.innerHTML = '';
    
    clearInterval(timeCounter);
    timeCounter = null;
    
})
