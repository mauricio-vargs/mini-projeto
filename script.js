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