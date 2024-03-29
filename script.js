let time = ''
let difficulty = ''

function selectTimer25(){
    time = '25-5'
}
function selectTimer50(){
    time = '50-10'
}

function selectBeginner(){
    difficulty = "beginner"
    pegarExercicio()
}

function selectIntermediate(){
    difficulty = 'intermediate'
    pegarExercicio()
}

function selectExpert(){
    difficulty = 'expert'
    pegarExercicio()
}

//Aqui começa o módulo para iniciar e parar o timer

let timeInterval;
let startTime;
let timeRunning = false;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const timeStatus = document.getElementById('timeStatus');
const timerDisplay = document.getElementById('timer');
const changeExercicio = document.getElementById('changeExercicio');
const mostraExercicio = document.getElementById('mostraExercicio')

startButton.addEventListener('click', start);

stopButton.addEventListener('click', stop);

changeExercicio.addEventListener('click', startExercicio)

function start(){
    timeRunning = true;
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    startTime = new Date().getTime();
    timeInterval = setInterval(updateTimer, 1000);
}

//Essa função faz com que apareça o timer seja decrescente em 
//minuto e segundos. Pega também o tempo selecionado

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
    
    let minutes = 0
    let seconds = 0

    if (time === '25-5'){
        minutes = 24 - elapsedMinutes;
        seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerStyle()
        console.log(minutes)
    }else if (time ==='50-10'){
         minutes = 49 - elapsedMinutes;
         seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
         timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
         timerStyle()
    } else {
         alert('Favor selecionar o tempo')
         stop()
    }
     
    if (minutes < 0) {
        exibirExercicio()
        timerExercicio()
    }
}

function timerExercicio(){
    changeExercicio.style.display = 'block';
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
    console.log(time)
    if (time === '25-5'){
        minutes = 0 - elapsedMinutes;
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

function timerStyle(){
    timerDisplay.style.fontSize="80px";
    timerDisplay.style.color = "white";
    timerDisplay.style.backgroundImage = "url('./imagem-pomodoro.jpg')";
    timerDisplay.style.borderRadius = "8px";
    timerDisplay.style.backgroundSize = "cover"; 
    timerDisplay.style.backgroundPosition = "center";
    timerDisplay.style.width = "50%";
    timerDisplay.style.height = "30%";
    timerDisplay.style.display = "flex";
    timerDisplay.style.justifyContent = "center";
    timerDisplay.style.alignItems = "center";
}

function stop() {
   if (timeRunning) {
      clearInterval(timeInterval);
      timeRunning = false;
      startButton.style.display = 'block';
      stopButton.style.display = 'none';
      changeExercicio.style.display = 'none';
      time = '';
      minutes = 0;
      seconds = 0;
      timerDisplay.style.backgroundImage = '';
      timerDisplay.textContent = '';
      mostraExercicio.innerHTML = '';
      mostraExercicio.style.backgroundColor = '';
    }
  }

//Aqui começa o módulo de exercícios

let listaExercicios = []
let exercicioAtual = 0
let offset = 0

function startExercicio(){
    exibirExercicio()
    if(exercicioAtual === 9){
        offset = offset + 10
        exercicioAtual = 0
        pegarExercicio()
        return
    }
    exercicioAtual++
}

function exibirExercicio(){
    const nomeExercicio = document.getElementById("nomeExercicio")
    const dificuldadeExercicio = document.getElementById("dificuldadeExercicio")
    const descricaoExercicio = document.getElementById("descricaoExercicio")

    nomeExercicio.innerText = listaExercicios[exercicioAtual].name
    dificuldadeExercicio.innerText = listaExercicios[exercicioAtual].difficulty
    descricaoExercicio.innerText = listaExercicios[exercicioAtual].instructions
    exercicioStyle()
}

function pegarExercicio(){
    fetch("https://api.api-ninjas.com/v1/exercises?type=stretching&difficulty=" + difficulty + "&offset=" + offset,{
        method: 'GET',
        headers: { 'X-Api-Key': '2czyWzvcUDlSdS+xe/5G3A==v56LbXISGo1cpaAG'},
        contentType: 'application/json',
    })
    .then(response => response.json())
    .then(dados => {
        listaExercicios = dados
    })
    
    .catch(error => console.log(error))
}

function exercicioStyle(){
    mostraExercicio.style.backgroundColor = "white"
    mostraExercicio.style.borderRadius = "8px";
    mostraExercicio.style.width = "50%";
    mostraExercicio.style.height = "30%";
    mostraExercicio.style.display = "flex";
    mostraExercicio.style.justifyContent = "center";
    mostraExercicio.style.alignItems = "center";
    mostraExercicio.style.flexDirection = "column";
    mostraExercicio.style.padding = "20px"
}