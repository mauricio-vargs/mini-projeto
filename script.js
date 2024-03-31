

let time = ''
let difficulty = ''
let pomodoroType = ''
let configs;
let minutes;
let seconds;
function selectTimer25() {
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    timer25.classList.add('selected')
    timer50.classList.remove('selected')
}
function selectTimer50() {
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    timer25.classList.remove('selected')
    timer50.classList.add('selected')
}

function selectBeginner() {
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.add('selected')
    intermediate.classList.remove('selected')
    expert.classList.remove('selected')
    return
}

function selectIntermediate() {
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.remove('selected')
    intermediate.classList.add('selected')
    expert.classList.remove('selected')
    return
}

function selectExpert() {
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
    let expert = document.getElementById('expert')

    beginner.classList.remove('selected')
    intermediate.classList.remove('selected')
    expert.classList.add('selected')
    return
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
const classTime = document.querySelector('.time'); //para selecionar somente essas classe da main
const classDifficulty = document.querySelector('.difficulty');


startButton.addEventListener('click', start);

stopButton.addEventListener('click', stop);

changeExercicio.addEventListener('click', startExercicio)

function start() {


    configs = document.querySelectorAll('.selected')

    pomodoroType = configs[0].innerText
    difficulty = configs[1].innerText

    console.log(difficulty)
    console.log(pomodoroType)


    timeRunning = true;
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    startTime = new Date().getTime();
    timeInterval = setInterval(updateTimer, 1000);

    mostraExercicio.style.display = "none"; //apagar exercício ao reiniciar o timer



}

//Essa função faz com que apareça o timer seja decrescente em 
//minuto e segundos. Pega também o tempo selecionado

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));

    minutes = 0
    seconds = 0

    if (pomodoroType === '25-5') {
        minutes = 24 - elapsedMinutes;
        seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerStyle()
        console.log(minutes)
    } else if (pomodoroType === '50-10') {
        minutes = 49 - elapsedMinutes;
        seconds = 60 - Math.floor((elapsedTime % (1000 * 60)) / 1000);
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerStyle()
    } else {
        alert('Favor selecionar o tempo')
        stop()
    }

    if (minutes < 0) {
        //pegarExercicio() //<---------------------
        timerExercicio()
    }
}

function timerExercicio() {
    changeExercicio.style.display = 'none';
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
    console.log(pomodoroType)
    if (pomodoroType === '25-5') {
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

function timerStyle() {
    timerDisplay.style.fontSize = "80px";
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
        changeExercicio.style.display = 'block'; //<---------------obter/mudar exercício somente no pause
        time = '';
        minutes = 0;
        seconds = 0;
        timerDisplay.style.backgroundImage = '';
        timerDisplay.textContent = '';

    }
}

//Aqui começa o módulo de exercícios

let listaExercicios = []
let exercicioAtual = 0
let offset = 0

//<--------------conferir o posicionamento das funções
const apiKey = 'ZB9COpRrl8yxkDb9slnytA==bgJmdTLUIyUXNKXO'
function pegarExercicio() {
    fetch("https://api.api-ninjas.com/v1/exercises?type=stretching&difficulty=" + difficulty + "&offset=" + offset, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
    })
        .then(response => response.json())
        .then(dados => {
            listaExercicios = dados
            exibirExercicio() // <----------------------
        })

        .catch(error => console.log(error))
}

function exercicioStyle() {
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

function startExercicio() {
    classTime.style.display = 'none';//<-- para esconder os botões (exceto iniciar) e haver espaço pros exercícios
    classDifficulty.style.display = 'none';
    if (exercicioAtual === 9) {
        offset = offset + 10
        exercicioAtual = 0
        pegarExercicio()
        return
    }
    pegarExercicio()
    exercicioAtual++
}

function exibirExercicio() {
    const nomeExercicio = document.getElementById("nomeExercicio")
    const grupoMuscular = document.getElementById("grupoMuscular")
    const descricaoExercicio = document.getElementById("descricaoExercicio")
    const equipamento = document.getElementById('equipamento')

    nomeExercicio.textContent = `Exercício: ${listaExercicios[exercicioAtual].name}`
    grupoMuscular.textContent = `Grupo Muscular: ${listaExercicios[exercicioAtual].muscle}`
    equipamento.textContent = `Equipamento: ${listaExercicios[exercicioAtual].equipment}`
    descricaoExercicio.textContent = `Instruções: ${listaExercicios[exercicioAtual].instructions}`
    exercicioStyle()
}



