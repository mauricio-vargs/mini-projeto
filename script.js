const actionsDiv = document.querySelector('.actions')
const main = document.querySelector('main')
const mostraExercicio = document.getElementById('mostraExercicio')
const display = document.querySelector('.timer')
const stopButton = document.querySelector('.stopButton')
let pomodoroType = ''
let difficulty = ''
let listaExercicios = []
let exercicioAtual = 0
let offset = 0
let timeRunning = false
const apiKey = '2Vg3n+JLn185X4IWi7eQ0w==Rkdgq1R5G8HsYqYs'


function selectTimer25() {
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')
    timer25.classList.add('selected')
    timer50.classList.remove('selected')
    pomodoroType = '25'
    return
}
function selectTimer50() {
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    timer25.classList.remove('selected')
    timer50.classList.add('selected')
    pomodoroType = '50'
    return
}

function selectBeginner() {
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')
 

    beginner.classList.add('selected')
    intermediate.classList.remove('selected')
    difficulty = 'beginner'
    return
}

function selectIntermediate() {
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')


    beginner.classList.remove('selected')
    intermediate.classList.add('selected')

    difficulty = 'intermediate'
    return
}



// Tira as configurações da tela e tira a classe selected de todos elementos
function start(){
    let beginner = document.getElementById('beginner')
    let intermediate = document.getElementById('intermediate')

    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    
    let selected = document.querySelectorAll('.selected')
    if(selected.length < 2){
        alert('selecione tempo e dificuldade')
        return
    }
    beginner.classList.remove('selected')
    intermediate.classList.remove('selected')
    
    timer25.classList.remove('selected')
    timer50.classList.remove('selected')


    stopButton.classList.add('show')
    stopButton.classList.remove('hidden')
    actionsDiv.style.display = 'none'

    createTimer()
}

// Cria o display e configura a duração do timer
function createTimer(){
   if(display.style.display ==='none'){
        display.style.display = 'flex'
   }

    if(pomodoroType === '25'){

        startTimer(display, 1500)
    } else if(pomodoroType === '50'){      
        startTimer(display, 3000)

    }

}


// Começa a contagem do timer
function startTimer(display, duration) {
    let timer = duration
    let minutes, seconds
    timeRunning = true
    let intervalPomodoro = setInterval(()=> {
        minutes = Math.floor(timer / 60)
        seconds = Math.floor(timer % 60)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        display.innerHTML = `${minutes}:${seconds}`
        timer -= 1
        if(timeRunning === false){
            clearInterval(intervalPomodoro)
        }
        if(timer < 0){
            pegarExercicio()
            if(pomodoroType === '25'){

                startExerciseTimer(display, 300)
            }else if(pomodoroType === '50'){
                startExerciseTimer(display, 600)

            }
            clearInterval(intervalPomodoro)
        }
    }, 1000)
}

function stop(){
    if(timeRunning){
        showConfigsPage()
        timeRunning = false
    }
}
//Timer de exercício
function startExerciseTimer(display, duration) {
    timeRunning = true
    let timer = duration
    let minutes, seconds
    let intervalExercise = setInterval(()=> {
        console.log(timer)
        minutes = Math.floor(timer / 60)
        seconds = Math.floor(timer % 60)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        display.innerText = `${minutes}:${seconds}`
        timer -= 1
        if(timeRunning === false){
            clearInterval(intervalExercise)
        }
        if(timer < 0){
            showConfigsPage()
            clearInterval(intervalExercise)
        }
    }, 1000)
}

function showConfigsPage(){
    mostraExercicio.classList.remove('show')
    mostraExercicio.classList.add('hidden')
    stopButton.classList.add('hidden')
    stopButton.classList.remove('show')
    display.style.display = 'none'
    actionsDiv.style.display = ''
}

// Requisição para pegar a lista de exercícios!
function pegarExercicio() {
    fetch("https://api.api-ninjas.com/v1/exercises?type=stretching&difficulty=" + difficulty + "&offset=" + offset, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
    })
        .then(response => response.json())
        .then(dados => {
            listaExercicios = dados 
            exibirExercicio()
        })

        .catch(error => console.log(error))

        
}


function startExercicio() {
    if (exercicioAtual === 9) {
        offset = offset + 10
        exercicioAtual = 0
        pegarExercicio()
        return
    }

    exercicioAtual++
    exibirExercicio()
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
    mostraExercicio.classList.add('show')
    mostraExercicio.classList.remove('hidden')

}