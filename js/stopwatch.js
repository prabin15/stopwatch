let startButton = document.querySelector(".js-start-button");
let stopButton = document.querySelector(".js-stop-button");
let resetButton = document.querySelector(".js-reset-button");
let lapsButton = document.querySelector('.js-laps-button');
let message = document.querySelector(".display-time");
let lapMessage = document.querySelector('.display-lap');
let miliseconds = 0;
let seconds = 0;
let minute = 0;
let hours = 0;
let count = 0;
let intervalID;
let isRunning = false;
let laps =[];
let isClicked = false;
stopButton.hidden = true;
lapsButton.disabled = true;
resetButton.hidden = true;

eventListerners();

function startWatch() {
  if (!isRunning) {
    intervalID = setInterval(() => {
      miliseconds =miliseconds + 5;
      if (miliseconds === 1000){
        seconds++;
        miliseconds = 0;
      if (seconds === 60) {
        minute++;
        seconds = 0;
        if (minute === 60) {
          hours++;
          minute = 0;
        }
      }
    }
      displayMessage();
    }, 5);
    isRunning = true;
    startButton.hidden = true;
    stopButton.hidden = false;
    lapsButton.disabled =false;
    switchButtons();
  }
}
function switchButtons(){
  if (isRunning === true){
    resetButton.hidden = true;
    lapsButton.hidden = false;
  }
}
function displayMessage() {
  return (message.innerHTML = `
 
 <span class='time-display'>
    ${addPadStart(hours)}:${addPadStart(minute)}:${addPadStart(seconds)}:${miliseconds.toString().padStart(3, "0")}
 </span>
 `);
}

function stopWatch() {
  clearInterval(intervalID);
  isRunning = false;
  startButton.hidden = false;
  stopButton.hidden = true;
  lapsButton.hidden = true;
  resetButton.hidden =false;
}


function addPadStart(string) {
  return string.toString().padStart(2, "0");
}
function resetWatch() {
  
  stopWatch();
  miliseconds = 0;
  seconds = 0;
  minute = 0;
  hours = 0;
  count= 0;
  laps= [];
  isClicked = false;
  displayMessage();
  lapMessage.innerHTML = "";
  resetButton.hidden = true;
  lapsButton.hidden =false;
  lapsButton.disabled= true;
  
}

function eventListerners() {
  startButton.addEventListener("click", startWatch);
  stopButton.addEventListener("click", stopWatch);
  resetButton.addEventListener("click", resetWatch);
  lapsButton.addEventListener("click", displayLap);
}

function displayLap(){
  isClicked = true;
  count++;
  if (isClicked){
    let lapTime = addPadStart(hours) + ":" + addPadStart(minute) + ":" + addPadStart(seconds) + ":" + addPadStart(miliseconds);
    let lapHTML = `<div class="individual-lap"><span>Lap ${count}</span> <span class="ms-time"> ${lapTime}</span>`;
    lapMessage.innerHTML += lapHTML;
  }
 
}