
function selectTimer25(){
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    timer25.classList.add('selected')
    timer50.classList.remove('selected')
    
}
function selectTimer50(){
    let timer25 = document.getElementById('25-5')
    let timer50 = document.getElementById('50-10')

    timer25.classList.remove('selected')
    timer50.classList.add('selected')

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

function start(){
    let configs = document.querySelectorAll('.selected')
    
    let pomodoroType = configs[0].innerText
    let difficulty = configs[1].innerText

    console.log(difficulty)
    console.log(pomodoroType)
    // getExercises(difficulty)
    // getTimer(pomodoroType)
}

function getExercises(difficulty){

}

function getTimer(pomodoroType) {
    
}