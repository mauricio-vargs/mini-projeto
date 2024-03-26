let time = ''

function selectTimer25(){
    time = '25-5'
}
function selectTimer50(){
    time = '50-10'
}

function selectBeginner(){
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.add('selected')
    intermediate.classList.remove('selected')
    expert.classList.remove('selected')
    return
}

function selectIntermediate(){
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.remove('selected')
    intermediate.classList.add('selected')
    expert.classList.remove('selected')
    return
}

function selectExpert(){
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.remove('selected')
    intermediate.classList.remove('selected')
    expert.classList.add('selected')
    return      
}

let timeInterval;
let startTime;
let timeRunning = false;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const timeStatus = document.getElementById('timeStatus');
const timerDisplay = document.getElementById('timer');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);

function start(){
    timeRunning = true;
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    startTime = new Date().getTime();
    timeInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
    
    let minutes = 0
    let seconds = 0

    if (time === '25-5'){
        minutes = 0 - elapsedMinutes;
        seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
    }else if (time ==='50-10'){
         minutes = 49 - elapsedMinutes;
         seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
    } else {
         alert('Favor selecionar o tempo')
    }
  
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (minutes < 0) {
        // stop();
        if (time === '25-5'){
            minutes = 5 - elapsedMinutes;
            seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
        } else {
            minutes = 10 - elapsedMinutes;
            seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
        }
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (minutes < 0) {
            start()
        }
    }
}

function stop() {
   if (timeRunning) {
      clearInterval(timeInterval);
      timeRunning = false;
      startButton.style.display = 'block';
      stopButton.style.display = 'none';
      timerDisplay.textContent = '';
    }
  }

function getExercises(difficulty){

}

function getTimer(pomodoroType){

}